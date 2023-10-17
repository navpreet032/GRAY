import { useState } from 'react';
import './FsButton.css' 
import { VscChromeClose,VscCircleFilled } from 'react-icons/vsc';

function FsButtton({isSaved, filename ,key ,onClick}) {
    const[ saved , setSaved] = useState(isSaved)
    
    const handleCloseFile=(event)=>{
        console.log("SPAN ",event.target.title)
    }
  return ( 
    
        <div className='FsDiv' key={key}>
        <button key={key} id="Fsbutton" value={filename} onClick={onClick}>{filename}</button>
        
                <VscChromeClose id="Fspan"onClick={handleCloseFile} title={filename} size={12}/>

       
        </div>
  )
}

export default FsButtton