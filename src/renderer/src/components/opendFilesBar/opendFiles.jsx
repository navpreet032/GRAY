/**
 * @implements the file buttons based on the number of files opned
 */
import { useEffect, useRef, useState } from 'react';
import { useDataPipeline } from '../../ContextAPi/context_main';
import FsButtton from '../../utils/fileStatusButton/FsButtton';
import './opendFiles.css';
import {addToBuffer} from '../../utils/FileBuffer/FileBuffer';



function OpendFiles() {
  const { selectedFile, SET_selectedFile, IS_save_clicked ,SET_is_save_clicked } = useDataPipeline();
  const [opendFiles, setOpendFiles] =useState([])
  // C:\Users\Acer\Desktop\Newfolder\Blink\Fun.c

  useEffect(() => {
    let isalreadypresent;
    if(opendFiles.length > 0 ){
     isalreadypresent = opendFiles.find((file)=>{
        return file.path == selectedFile;
      })
    }
if(!isalreadypresent){
    const filename = selectedFile.substring(selectedFile.lastIndexOf('\\') + 1, selectedFile.length);
    const tmpObj = {
      filename: filename,
      isSaved: IS_save_clicked,
      path: selectedFile
    };
  
    const isPresent = opendFiles.some((file) => file.path === selectedFile);

    if (opendFiles.length >= 9) {
      // save file at last
      
      // close the last file
      opendFiles.pop();
    }
    if (!isPresent && filename !== '') {
      
      setOpendFiles([...opendFiles,tmpObj])
      addToBuffer(filename, selectedFile,"", true, true);
    }
  }

  }, [selectedFile])

  // useEffect(()=>{ //! BUG
  //   opendFiles.find((file)=>{
  //     if(file.path == selectedFile){
  //       file.isSaved = IS_save_clicked;
  //       console.log(file.path , file.isSaved)
  //     }
  //   })
  // },[IS_save_clicked])

  const handleclick = (event)=>{
    const filename = event.target.value;
    //* to get filepath form filename
    const filepath = opendFiles.find((file)=>{
      if(file.filename === filename && filename !='')
        return file; 
    })
    // to stop user from trying to  open an already opend file
    if(selectedFile != filepath.path){SET_selectedFile(filepath.path)
     

    // console.log(filepath.path)
    }
  }

  return (
    opendFiles.map((file) => (
      <FsButtton key={file.filename} isSaved={file.isSaved} filename={file.filename} onClick={handleclick}/>
    ))
    
  )
}

export default OpendFiles