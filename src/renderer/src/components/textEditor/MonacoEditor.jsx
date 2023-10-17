import Editor from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useCallback, useEffect, useRef, useState } from 'react';
import './editor.css';
import { useDataPipeline } from '../../ContextAPi/context_main';
import { bufferHasFile, getDataFromBuffer, writeDataToBuffer, clearDataFromBuffer } from '../../utils/FileBuffer/FileBuffer';
loader.config({ monaco });

// TODO MAKE DOCUMENTATION FOR THE CHANGES MADE AND UPLOAD TO GITHUB


function MonacoEditor({ height, width }) {
  const { selectedFile, IS_save_clicked, SET_is_save_clicked } = useDataPipeline()
  const [isThemeSet, setIsThemeSet] = useState(false);
  const editorRef = useRef('');
  const [editorValue, setEditorvalue] = useState("");
 
  const read_file_from_path = async (path) => {
    const data = await window.electronAPI.READ_selected_file(path)
    setEditorvalue(data.toString())
    // using ref to update the fileData as it changes on reRender
    editorRef.current = data;
  }


  loader.init().then(
    import('monaco-themes/themes/Dracula.json')
      .then(data => {
        monaco.editor.defineTheme('dracula', data);
        setIsThemeSet(true);

      }
      )
  );


  function handleEditorDidMount(editor, monaco) {
    // here is the editor instance
    // you can store it in `useRef` for further usage
    editorRef.current = editor;
  }


  const save_file = useCallback(async (data, path) => {
    console.log("PATH ", data);
    await window.electronAPI.SAVE_file(data, path);
  }, [IS_save_clicked])

  useEffect(() => {
    const filename = selectedFile.substring(selectedFile.lastIndexOf('\\') + 1, selectedFile.length);
    const filebufferdata =  getDataFromBuffer(filename);
   //* if buffer has the file and but doesnt contain the file data then read the file from the disk. else set the
  //*  editor value to data from the buffer
    if(bufferHasFile(filename) && (filebufferdata.filedata).length > 0){
       setEditorvalue(filebufferdata.filedata);
    }
    else{read_file_from_path(selectedFile);}    
  }, [selectedFile])

  useEffect(() => {
    save_file(editorValue, selectedFile)
    const filename = selectedFile.substring(selectedFile.lastIndexOf('\\') + 1, selectedFile.length);
    //* clears data from the file buffer when the file is saved on the disk.

    clearDataFromBuffer(filename)
    SET_is_save_clicked(false)
  }, [IS_save_clicked])

  let debounceTimer;
  function handleOnChange(value, event) {
    // Clear the previous debounce timer
    clearTimeout(debounceTimer);

    // Set a new debounce timer
    debounceTimer = setTimeout(() => {
      // This code will run after a specified delay 
      setEditorvalue(value);
      const filename = selectedFile.substring(selectedFile.lastIndexOf('\\') + 1, selectedFile.length);
      
      if(bufferHasFile(filename)){
      writeDataToBuffer(filename,value)
    }
      // console.log(value);
    }, 100);
  }
  return (
    <Editor height={height} width={width}
      value={editorValue}
      theme={isThemeSet ? 'dracula' : "vs-dark"}
      defaultLanguage="cpp" defaultValue="// Welcome to GrayByteStudio 😎"
      onChange={handleOnChange}
      onMount={handleEditorDidMount}
    />
  )
}

export default MonacoEditor