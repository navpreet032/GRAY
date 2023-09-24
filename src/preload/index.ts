import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { mkdir, readFile, unlink, writeFile } from 'fs/promises'
import { getFileTree, watchFileChanges } from '../renderer/src/utils/files_utils/get_Files_and_Folders'
import {make_temp_dir} from '../renderer/src/utils/files_utils/handle_tempDir'
import { compileCode, burnCode, ReadDataFromBoardJSON, setProcessor } from '../renderer/src/Code_processor/compileCode'
import { existsSync } from 'fs'
import  { SerialPort } from 'serialport'



// import {CMD} from '../renderer/src/utils/Integrate_CMD'
// Custom APIs for renderer

const api = {
  readConfig: () => readFile('/path/to/config.json', { encoding: 'utf-8' })
  
}
contextBridge.exposeInMainWorld('electron', api)
// API for AVR Related work

// contextBridge.exposeInMainWorld('CMD_Api',{
//   SEND_to_cmd: CMD(),
// })

contextBridge.exposeInMainWorld('AVR_Api', {
  //properties of AVR_Api object:
  // func to compile code. returns the data provided by compiler
  COMPILE_code: async (InputFile, OutputFile) => {
    const data = await compileCode(InputFile, OutputFile);
    return data;
  },
  // func to upload the code to ARDUINO 
  BURN_code : async (filename)=>{
    const data = await burnCode(filename);
    return data;
  },
  // func to make temp dir which is used to store temp files like (.o, .d, .elf)
  MAKE_tmp_dir: (rootDir)=>{
    return make_temp_dir(rootDir);
  },
  SCAN_ports: async()=>{
    try {
      const ports = await SerialPort.list();
      const devices: object [] =[]
      ports.forEach(port => {
        devices.push(port)
        

      });
      return devices;
    } catch (err) {
      console.error('Error listing serial ports:', err);
    }
  },
  // Runs when value is changed in Boards Dropdown
  On_BoardChanges:async(board)=>{
    try {
      await ReadDataFromBoardJSON(board);
      return null;
    } catch (error) {
      console.log(error)
    }
  },
  // sets the processor value to current selected value 
  On_ProcessorChanges:(processor)=>{
    setProcessor(processor)
  }

})

// API For file and folder related process
contextBridge.exposeInMainWorld('electronAPI', {

  // func to get the PATH returned by 'showOpenDialog'Box : i.e the folder you have selected 
  GET_selected_folder_path: async () => {
    const selectedFolderPath = await ipcRenderer.invoke('open-folder-dialog');
    return selectedFolderPath;
  },

  // func to get the file&folders tree genrated by `getFileTree`:
  GET_file_tree: (path) => {
    // return the files&Folders in a hierarchy order
    return getFileTree(path);
  },
  
  // func which updates the 'fileTree' when new file/folder is added or deleted
  WATCH_fileChanges: (path, onChange) => {
    watchFileChanges(path, onChange);
  },

  // func that read the contents of a selected file
  READ_selected_file: async (path) => {
    try {
      const data = await readFile(path, { encoding: 'utf8' });
      // returns the contents of file in a string
      return data.toString();
    } catch (error) {
      console.log("CANT READ FILE ", error);
      return null;
    }
  },
  DELETE_file: async (path)=>{
    unlink(path); 
  },

  // func that saves the file at given path
  SAVE_file: async (data, path) => {
    try {
      await writeFile(path, data);
    } catch (error) {
      console.log("CAN'T SAVE FILE ", error)
    }
  },

  // func that create a new file at give file 
  CREATE_newFile: async (path) => {
    try {
      await writeFile(path, '');
    } catch (error) {
      console.log("CAN'T CREATE FILE : ", error)
    }
  },

  // func that create a new folder at give folder
  CREATE_newFolder: (path) => {
    try {
      if (!existsSync(path)) {
        mkdir(path);
      }
    } catch (error) {
      console.log("CAN'T CREATE FOLDER : ", error)
    }
  },
  

})

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
