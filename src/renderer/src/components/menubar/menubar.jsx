import React, { useEffect } from 'react'
import { useDataPipeline } from '../../ContextAPi/context_main';
import './menubar.css'
import { DiCode,DiCodeigniter } from 'react-icons/di';
import { AiFillSave } from 'react-icons/ai';
import { FcDebian } from 'react-icons/fc';
export default function Menubar() {
    const { SET_rootDir,SET_is_save_clicked } = useDataPipeline();
    const handleOpenfolder=async()=>{
        const path = await window.electronAPI.GET_selected_folder_path();
        SET_rootDir(path)
    }
    const handleSave=()=>{
        
        SET_is_save_clicked(true)
    }
    return (
        <div className='menu'>
        <div className='left'>
            {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlSQKbmPBF-9Iq9kqMmY7EF8oca_HtVyKA49aysagzw&s" alt="menu" /> */}
            <span><FcDebian size={32}/></span>
            <p className='options' onClick={handleOpenfolder}>opnFolder</p>
            <p className='options' >Edit</p>
            <p className='options'>View</p>
            <p className='options'>Go</p>
            <span className='options'><DiCode size={24}/></span>
            <span className='options'><DiCodeigniter /></span>
            <span className='options' onClick={handleSave}><AiFillSave /></span>
        </div>
        </div>
    )
}
