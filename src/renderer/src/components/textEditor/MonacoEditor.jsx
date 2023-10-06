import Editor from '@monaco-editor/react';
import { loader } from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { useEffect, useState } from 'react';

import './editor.css';


function MonacoEditor({height,width}) {
    const [isThemeSet, setIsThemeSet] = useState(false)
self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === 'json') {
        return new jsonWorker();
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new cssWorker();
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new htmlWorker();
      }
      if (label === 'typescript' || label === 'javascript') {
        return new tsWorker();
      }
      return new editorWorker();
    },
  };
  
  loader.config({ monaco });
  
  loader.init().then();
  
  useEffect(()=>{
    import('monaco-themes/themes/Dracula.json')
    .then(data => {
        monaco.editor.defineTheme('dracula', data);
        setIsThemeSet(true)
    }
    )
  },[])
  

  
    return( 
    <Editor height={height} width={width} 
    theme={isThemeSet?'dracula':"vs-dark"}
    defaultLanguage="javascript" defaultValue="// some"
    />
    )
}

export default MonacoEditor