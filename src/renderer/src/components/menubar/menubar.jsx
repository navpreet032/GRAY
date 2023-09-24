import React, { useEffect, useRef, useState } from 'react'
import { useDataPipeline } from '../../ContextAPi/context_main';
import './menubar.css'
import { DiCode, DiCodeigniter } from 'react-icons/di';
import { AiFillSave } from 'react-icons/ai';
import { Dropdown } from 'react-nested-dropdown';
import BoardsData from '../../config/boards.json';
import 'react-nested-dropdown/dist/styles.css';


export default function Menubar() {
    const { selectedFile, rootDir, IS_save_clicked, SET_is_save_clicked, setCMDdata, CurrentSelectedBoard } = useDataPipeline();
    const TEMP_DIR = useRef('');
    const fileType = selectedFile.substring(selectedFile.indexOf('.'), selectedFile.length);
    const fileName = selectedFile.substring(Math.max(selectedFile.lastIndexOf('\\'), selectedFile.lastIndexOf('/')) + 1, selectedFile.indexOf('.'));
    const BoardsMenu = [];
   

    const items = [
        {
          label: 'Boards',
          items:[
            {
                label:'Nano',
                onSelect: () => console.log('Nano'),
            },
            {
                label:'AVR',
                onSelect:()=>console.log("Avr")
            },
          ],
        },
        
        
        
      ];


    useEffect(()=>{
        
        if(CurrentSelectedBoard.length != 0){
            // console.log(BoardsData[CurrentSelectedBoard])
        
        if (BoardsData[CurrentSelectedBoard].hasOwnProperty("menu")){
            const data = BoardsData[CurrentSelectedBoard].menu;
            
            for(const chip in data){
                for( const cpu in data[chip]){
                    BoardsMenu.push(cpu)
                }
               
            } 
            // console.log("BoardsMenu " ,BoardsMenu)
        }
    }
    generateProcessorSubMenu()
    },[CurrentSelectedBoard])

    
    const generateProcessorSubMenu = () => {
        const processorSubMenu = {
            label: 'Processor',
            items: [],
          };
        BoardsMenu.forEach((processor) => {
          const processorItem = {
            label: processor,
            //? set the processor in "compileCode.js"
            onSelect: () => window.AVR_Api.On_ProcessorChanges(processor),
          };
        //   console.log("processor ",processor)
          processorSubMenu.items.push(processorItem);
        
        });
        
      
        return processorSubMenu;
      };
      useEffect(()=>{
        if (BoardsMenu.length > 0) {
        
            items.push(generateProcessorSubMenu());
            // console.log("SUB", generateProcessorSubMenu())
            
          }
      },[BoardsMenu])
      

    // context Api to know wether Save button is pressed or not
    const handleSave = () => {
        SET_is_save_clicked(true)
        TEMP_DIR.current = window.AVR_Api.MAKE_tmp_dir(rootDir);
        console.log("TEMP_DIR", TEMP_DIR.current)
    }
    // to compile the code
    const handleCompile = async () => {


        if (!IS_save_clicked) {
            handleSave();
        }
        if (fileType == '.c') {
            await window.electronAPI.DELETE_file(TEMP_DIR.current + '/' + fileName + '.o')
            await window.electronAPI.DELETE_file(TEMP_DIR.current + '/' + fileName + '.d')
            const data = await window.AVR_Api.COMPILE_code(selectedFile, TEMP_DIR.current + '/' + fileName)
            if (data)
                setCMDdata('\n' + data + ' ')
            else
                setCMDdata('\n' + ' Compiled SuccessFully' + ' ')


        }

    }
    // upload th code to the ardiuno
    const handleBurn = async () => {
        await handleCompile();
        try {
            setCMDdata(prev => prev + '\n' + 'Processing »»»»»»»»»»»»» ' + '\n')
            console.log("SELECTED FILE  elf ", TEMP_DIR.current + '/' + fileName)
            await window.electronAPI.DELETE_file(TEMP_DIR.current + '/' + fileName + '.elf')
            await window.electronAPI.DELETE_file(TEMP_DIR.current + '/' + fileName + '.hex')
        } catch (err) {
            //setCMDdata(prev => prev + '\n'+ err  +' ')
            console.log("FILE NOT FOUND ", err)
        }
        try {
            setCMDdata(prev => prev + '\n' + 'Flashing ###############################' + '\n')
            console.log("SELECTED FILE burn", TEMP_DIR.current + '/' + fileName)
            const { stdout, stderr } = await window.AVR_Api.BURN_code(TEMP_DIR.current + '/' + fileName)
            console.log(JSON.stringify(stdout, null, 2))
            console.log(JSON.stringify(stderr, null, 2))
            setCMDdata(stderr)

        } catch (err) {
            setCMDdata(prev => prev + '\n' + err.stdout + ' ')
            console.log("DUDE ERROR ", err)
        }




    }
   
    return (
        <div className='menu'>
            <div className='left'>
                <img src="https://github.com/navpreet032/images-for-projects/assets/55250212/4fd07585-604a-4ffd-89d2-0740df9cc59e" alt="menu" />
                {/* <span style={{ color: '#dd1e60' }}>Gbyte</span> */}
                <p className='options' >View</p>
                <p className='options' >Edit</p>
                <p className='options'>File</p>
                <Dropdown items={items} containerWidth="100px" >
      {({ isOpen, onClick }) => (
        <p type="button" onClick={onClick} className='options' >
          Utils
        </p>
      )}
    </Dropdown>
                

                <span className='options' onClick={handleCompile}><DiCode size={24} /></span>
                <span className='options'><DiCodeigniter onClick={handleBurn} /></span>
                <span className='options' onClick={handleSave}><AiFillSave /></span>
            </div>
        </div>
    )
}
