import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import {mkdir, readFile, writeFile} from 'fs/promises'
import {getFileTree, watchFileChanges} from '../renderer/src/utils/files_utils/get_Files_and_Folders'
import { existsSync } from 'fs'
// Custom APIs for renderer

const api = {
  readConfig: () =>  readFile('/path/to/config.json', {encoding: 'utf-8'})
}
contextBridge.exposeInMainWorld('electron', api)

// API to get path of folder selected in dialog box;
contextBridge.exposeInMainWorld('electronAPI',{
  GET_selected_folder_path: async () => {
    const selectedFolderPath = await ipcRenderer.invoke('open-folder-dialog');
    return selectedFolderPath;
  },
  GET_file_tree: (path)=>{

    const a =getFileTree(path);

    return a;
  },
  WATCH_fileChanges: (path, onChange)=>{
    return watchFileChanges(path, onChange);
  },
  READ_selected_file:async(path)=>{
    try {
      const data = await readFile(path, { encoding: 'utf8' });
      return data.toString();
    } catch (error) {
      console.log("CANT READ FILE ", error);
      return null;
    }
  },
  SAVE_file: async (data, path)=>{
    try {
      await writeFile(path, data);
    } catch (error) {
      console.log("CAN'T SAVE FILE ",error)
    }
  },
  CREATE_newFile: async( path)=>{
    try {
      await writeFile(path, '');
    } catch (error) {
      console.log("CAN'T CREATE FILE : ",error)
    }
  },
  CREATE_newFolder: (path)=>{
    try {
      if (!existsSync(path)) {
        mkdir(path);
      }
    } catch (error) {
      console.log("CAN'T CREATE FOLDER : ",error)
    }
  }
  
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
