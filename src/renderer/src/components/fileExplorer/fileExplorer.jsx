// icons : https://react-icons.github.io/react-icons/icons?name=vsc
// React Complex Tree https://rct.lukasbach.com/ https://rct.lukasbach.com/docs/getstarted

import { VscNewFolder, VscNewFile, VscChevronLeft, VscFolder, VscFile } from "react-icons/vsc";
import './fileExplorer.css'
import { DATA_Pipe } from '../../useContext/store';
import { useContext, useEffect, useState } from "react";
/**
 * Posts the path of the selected file to the main process for further handling.
 * @function POST_pathOfSelectedFile
 * @param {string} filename - The name of the selected file.
 * @param {string} pathtofile - The path of the selected file.
 * @returns {void}
 *
 * @description
 * This function constructs the full path of the selected file using the provided
 * filename and pathtofile. It then toggles the is_FileSelected flag, indicating
 * whether a file is currently selected. After that, it invokes the
 * `path_Of_opned_file` method from the `electronAPI` to send the constructed
 * path to the main process for further handling.
 */



/**
 * 
 * @param {object} files object of all files and folders
 * @param {callback} onBack when go back a folder
 * @param {callback} onOpen when a folder is opend
 * @param {string} dir path of parent dir of selected file
 * @returns 
 */
const FilesViewer = ({ files, onBack, onOpen, dir }) => {
  const { set_selectedFilePath, selectedFolderPath } = useContext(DATA_Pipe);
 
  const POST_pathOfSelectedFile = (pathtofile, filename) => {
    let path = pathtofile + '\\' + filename;
    set_selectedFilePath(path);

    // window.electronAPI.path_Of_opned_file(path)

  }

 
 
  const handleCreatnewfile = async () => {
    console.log('new file ',`${selectedFolderPath}/${'untitled.c'}`)
     await window.electronAPI.CREATE_new_file(selectedFolderPath)
  }
 
  const handleCreatnewfolder = async () => {
    console.log('new file ',`${selectedFolderPath}/${'Newfolder'}`)
    await window.electronAPI.CREATE_new_folder(selectedFolderPath);
  }

  return (
    <table className="Table">
      <tbody>
        <tr className="explorerTop" >
          <td onClick={onBack}><VscChevronLeft /></td>
          <div className="explorertopLeft">
            <td ><VscNewFile onClick={handleCreatnewfile}/></td>
            <td ><VscNewFolder onClick={handleCreatnewfolder}/> </td>
          </div>
        </tr>

        {files.map(({ name, directory }) => {
          return (
            <div className="height">
              <tr className="clickable" onClick={() => { directory ? onOpen(name) : POST_pathOfSelectedFile(dir, name) }}>

                <td >
                  {directory ? <VscFolder className="foldericon" /> : <VscFile className="fileicon" />}
                </td>

                <td>{name}</td>

              </tr>
            </div>
          )
        })}
      </tbody>
    </table>
  )
}


export default FilesViewer;