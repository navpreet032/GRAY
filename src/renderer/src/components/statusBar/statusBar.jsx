import './statusBar.css'
import { SlRefresh } from 'react-icons/sl';
import { MdUsbOff, MdUsb } from 'react-icons/md';
import BoardsData from '../../config/boards.json'
import { useCallback, useEffect, useMemo, useState,useRef } from 'react';

export default function StatusBar() {
    /**
    * check for serial devices connected to pc
    * @returns list of devices connected
    */
    
    const [selectedPort, setSelectedPort]=useState('')
    const [selectedBoard, setSelectedBoard] = useState('')
    const boards = useRef([])
    const [devices ,setDevices]= useState([])
    

    const ScanningPorts = async() => {
        const newDevices = await window.AVR_Api.SCAN_ports();
        setDevices(prev => {
          if(prev !== newDevices) return newDevices;
          return
        });
      }

      const ReadBoardsData = useMemo(() => {
        return () => {
            // ! this line " boards.current = [] " is used because data is pushed 2 times in Dropdown . So this clears all previous entries in the array 
            boards.current = [];
          for (const Board in BoardsData) {
            if ( BoardsData.hasOwnProperty(Board) && typeof  BoardsData[Board] === "object") {
              if ( BoardsData[Board].hasOwnProperty("name") ) {
                
                const name =  BoardsData[Board].name;
                boards.current.push(name);
                // console.log(`Name of object "${Board}": ${name}`);
              }
            }
          }
          console.log("Rendered");
        };
      }, [ BoardsData]);

      useEffect(()=>{
        ReadBoardsData();
      },[BoardsData])

    useEffect(()=>{
       const int = setInterval(()=>{
        ScanningPorts()
       },5000)

       return ()=>{
        clearInterval(int)
       }
    },[])



    const handleOptionChange=(event)=>{
       setSelectedPort(event.target.value)
    }
    const handleBoardChange=(event)=>{
       setSelectedBoard(event.target.value)
    }

    return (
        <div className="statusbarMain">
            <div className="statusbarleft">
                <p>left</p>
            </div>
            <div className="statusbarright">
                <p>right</p>
                {
                <span>Boards: { 
                    <select value={selectedBoard} onChange={handleBoardChange}>
                    {
                        boards.current.map(board =>(<option key= {board +"1"} value={board}>{board}</option>))
                    }
                    </select>}
                    </span>
                }
                
                

                {
                    devices.length !== 0 && (
                        <span><MdUsb size={18} />: {<select value={selectedPort} onChange={handleOptionChange}>
                        {devices.map(option => (
                          <>
                          <option key={option.path} value={option.path}>{option.path} </option>
                          </>
                        ))}
                      </select>} </span>
                      )
                }{
                    devices.length === 0 &&(
                        <span><MdUsbOff size={18}></MdUsbOff></span>
                    )
                }
                
                <span><SlRefresh size={18}  onClick={()=>ScanningPorts()}/></span>

            </div>
        </div>
    )
}
