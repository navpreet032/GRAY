/**
 * Themes : https://uiwjs.github.io/react-codemirror/#/theme/data/sublime
 * Examples : https://codemirror.net/examples/
*/
// use path send via context and Read that file and conv the data to string and use it
import React, { useEffect, useRef, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { tags as t } from '@lezer/highlight';
import { sublime, sublimeInit } from '@uiw/codemirror-theme-sublime';
import { dracula, draculaInit } from '@uiw/codemirror-theme-dracula';
import { useDataPipeline } from '../../ContextAPi/context_main';

export default function Editor({height, width}) {
  // 'selectedFile' stores the path of current Selectedfile
  const {selectedFile, IS_save_clicked, SET_is_save_clicked} = useDataPipeline()
  // ref to preserve the previous code content
  const refFileData = useRef('')
  const [fileData, setFileData] = useState(refFileData.current)


  // function to read the file at given 'path'
  const read_file_from_path = async (path)=>{
    const data = await window.electronAPI.READ_selected_file(path)
    await setFileData(data.toString())
    // using ref to update the fileData as it changes on reRender
    refFileData.current = data;
  }

  const save_file = async (data, path)=>{
    console.log("PATH ", data);
    await window.electronAPI.SAVE_file(data, path);
  }
 
  // read the contents of selected file (update when the selected file changes)
  useEffect(()=>{
    read_file_from_path(selectedFile);
  },[selectedFile])

  useEffect(()=>{ 
    save_file(fileData, selectedFile)
    SET_is_save_clicked(false)
  },[IS_save_clicked])
  
  const onChange = React.useCallback((value, viewUpdate) => {
    setFileData(value)
  }, []);

  return (
    
   
    
      <CodeMirror
        value={fileData}
        height = {height+'px'}
        width = {width+'px'}
        theme={sublimeInit({
          settings: {
            caret: 'grey',
            fontFamily: 'monospace',
          },
          styles: [
            { tag: t.comment, color: 'orange' },
          ]
        })}
        extensions={[cpp()]} 
        onChange={onChange}
      />
    
  );
}
