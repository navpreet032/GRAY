import React, { useEffect, useState } from 'react';
import { VscFolder, VscChevronRight, VscFolderOpened } from 'react-icons/vsc';
import { MdExpandMore } from 'react-icons/md';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import './fileTree.css'
import checkFileType from '../../utils/files_utils/fileTypes_Icons';
import { useDataPipeline } from '../../ContextAPi/context_main';


export default function FileTree({ rootPath }) {
  const [fileTree, setFileTree] = useState(window.electronAPI.GET_file_tree(rootPath));
  const {SET_selectedFile} = useDataPipeline()
  let files = []
  // to update realtime Dir changes
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
  }, [rootPath]);
  // to set Selected file path
  const handleItemInvoked = (event, nodeId) => {
    let filename = nodeId.substring(nodeId.lastIndexOf('\\')+1,nodeId.length)
    console.log(filename)
    if(files.includes(filename)){
      SET_selectedFile(nodeId)
    console.log(nodeId)
    }
    
  };
  const pushToFilesArray =(file)=>{
    files.push(file)
    
  }

 
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