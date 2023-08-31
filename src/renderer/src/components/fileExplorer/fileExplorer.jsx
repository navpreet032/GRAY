import { VscNewFile, VscNewFolder, VscRefresh } from 'react-icons/vsc'
import './fileExplorer.css'
import React, { useEffect, useState } from 'react'
import { useDataPipeline } from '../../ContextAPi/context_main';
import FileTree from './fileTree';

export default function FileExplorer() {
  const { rootDir, SET_rootDir } = useDataPipeline()
  console.log("rootDir",rootDir)
  
  const handleOpenFolder_file = async () => {
    const path = await window.electronAPI.GET_selected_folder_path();
    SET_rootDir(path);
     
  }
  const handleCreateNewFile = async()=>{
    await window.electronAPI.CREATE_newFile(rootDir+'\\ untitled.txt')
  }
  const handleCreateNewFolder =()=>{
    window.electronAPI.CREATE_newFolder(rootDir+'\\ folder')
  }

  return (
    <div className='container'>
      <div className='optonsbar'>
        <span><VscNewFile  onClick={handleCreateNewFile}/></span>
        <span><VscNewFolder onClick={handleCreateNewFolder}/></span>
        <span><VscRefresh /></span>
      </div>

      <br></br>

      <div className='file_explorer'>
        {rootDir && (<FileTree rootPath={rootDir} />)}
        {!rootDir && (
          <>
            <div className='openFolder'>
              <p>Open folder/file</p>
              <button onClick={handleOpenFolder_file}>Open</button>
            </div>
          </>
        )}



      </div>
    </div>
  )
}
