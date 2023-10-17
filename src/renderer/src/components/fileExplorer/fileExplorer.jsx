import { VscNewFile, VscNewFolder, VscRefresh } from 'react-icons/vsc'
import './fileExplorer.css'
import React, { useEffect, useState } from 'react'
import { useDataPipeline } from '../../ContextAPi/context_main';
import FileTree from './fileTree';

/**
 * FileExplorer Component
 *
 * The FileExplorer component provides a user interface for file and folder operations.
 * It includes options to create new files, new folders, and refresh the file tree.
 *
 * @returns {JSX.Element} A component that allows users to interact with files and folders.
 */
export default function FileExplorer() {
  // Access the root directory and its setter from the context API
  const { rootDir, SET_rootDir } = useDataPipeline();

  /**
   * Handle opening a folder or file.
   * Opens a dialog to select a folder or file and sets it as the root directory.
   */
  const handleOpenFolder_file = async () => {
    const path = await window.electronAPI.GET_selected_folder_path();
    SET_rootDir(path);
  };

  /**
   * Handle creating a new file.
   * Calls the Electron API to create a new file in the current root directory.
   */
  const handleCreateNewFile = async () => {
    await window.electronAPI.CREATE_newFile(rootDir + '\\untitled.txt');
  };

  /**
   * Handle creating a new folder.
   * Calls the Electron API to create a new folder in the current root directory.
   */
  const handleCreateNewFolder = () => {
    window.electronAPI.CREATE_newFolder(rootDir + '\\folder');
  };

  return (
    <div className='container'>
      <div className='optonsbar'>
        {/* Create a new file */}
        <span><VscNewFile  onClick={handleCreateNewFile}/></span>
        {/* Create a new folder */}
        <span><VscNewFolder onClick={handleCreateNewFolder}/></span>
        {/* Refresh the file tree */}
        <span><VscRefresh /></span>
      </div>

      <br></br>

      <div className='file_explorer'>
        {/* Render the file tree */}
        {rootDir && (<FileTree rootPath={rootDir} />)}

        {/* Display the "Open folder/file" prompt if no root directory is set */}
        {!rootDir && (
          <>
            <div className='openFolder'>
              <p>Open folder/file</p>
              <button id='fileopnButt' onClick={handleOpenFolder_file}>Open</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
