/**
 * FileTree Component
 *
 * The FileTree component is used to display a hierarchical file and folder structure
 * based on a specified root path. It provides real-time updates when changes occur in
 * the root and its subdirectories.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.rootPath - The root directory path to start the file tree from.
 * @returns {JSX.Element} A component that renders a hierarchical file tree.
 */

import React, { useEffect, useState } from 'react';
import { VscFolder, VscChevronRight, VscFolderOpened } from 'react-icons/vsc';
import { MdExpandMore } from 'react-icons/md';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import './fileTree.css'
import checkFileType from '../../utils/files_utils/fileTypes_Icons';
import { useDataPipeline } from '../../ContextAPi/context_main';


export default function FileTree({ rootPath }) {
  // used for realtime Tree updation , initilized with files and folder at rootpath
  const [fileTree, setFileTree] = useState(window.electronAPI.GET_file_tree(rootPath));
  // to set the path of current selected file
  const {SET_selectedFile} = useDataPipeline()
  // to store all the files in an array
  let files = []

  // to update the filexplorer in realtime basd on changes occur in root and its subdirectory 
  useEffect(() => {
    const handleChange = (updatedTree) => {
      setFileTree(updatedTree);
    };

    window.electronAPI.WATCH_fileChanges(rootPath, handleChange);

    return () => {
      // Cleanup the watcher when component unmounts
      // (optional but recommended)
      window.electronAPI.WATCH_fileChanges(rootPath, handleChange);
    };
  }, []);

  // to set Selected file path
  const handleItemInvoked = (event, nodeId) => {
    // to get only the filename from whole path example : (C:\Users\Acer\Desktop\Newfolder\Blink\blink.c) to (blink.o)
    let filename = nodeId.substring(nodeId.lastIndexOf('\\')+1,nodeId.length)
    
    // this allow only files to be selected
    if(files.includes(filename)){
      SET_selectedFile(nodeId)
    }
    
  };

  // function to push file names to 'files array'
  const pushToFilesArray =(file)=>{
    files.push(file)
  }

 // Render tree items recursively
  const renderTreeItems = (node) => {
    const { label, isDirectory, children } = node;
    return (
      <>
        <TreeItem
          key={node.id}
          nodeId={node.id}
          label={
            <span className='span'>
              {isDirectory ? <span><VscFolder color='#dcb67a' /> {label}  </span> : <span>{checkFileType(label)}{"  " + label}{pushToFilesArray(label)}</span>}
            </span>
          }
        >
          {children.map((child) => renderTreeItems(child))}
        </TreeItem>
        <br></br>
      </>
    );
  };

  return (
    <TreeView
      aria-label="rich object"
      defaultCollapseIcon={<MdExpandMore />}
      //   defaultExpanded={[0]}
      defaultExpandIcon={<VscChevronRight />}
      
      onNodeSelect={handleItemInvoked}
      sx={{ height: 800, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      {renderTreeItems(fileTree)}

    </TreeView>
  );
}