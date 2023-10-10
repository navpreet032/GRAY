import Editor from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
// import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { useCallback, useEffect, useRef, useState } from 'react';
import './editor.css';
import { useDataPipeline } from '../../ContextAPi/context_main';
loader.config({ monaco });




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
    read_file_from_path(selectedFile);
  }, [selectedFile])

  useEffect(() => {
    save_file(editorValue, selectedFile)
    SET_is_save_clicked(false)
  }, [IS_save_clicked])

  let debounceTimer;
  function handleOnChange(value, event) {
    // Clear the previous debounce timer
    clearTimeout(debounceTimer);

    // Set a new debounce timer
    debounceTimer = setTimeout(() => {
      // This code will run after a specified delay (e.g., 500 milliseconds)
      setEditorvalue(value);
      console.log(value);
    }, 500);
  }
  return (
    <Editor height={height} width={width}
      value={editorValue}
      theme={isThemeSet ? 'dracula' : "vs-dark"}
      defaultLanguage="cpp" defaultValue="// some"
      onChange={handleOnChange}
      onMount={handleEditorDidMount}
    />
  )
}

export default MonacoEditor