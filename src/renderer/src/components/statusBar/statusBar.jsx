import './statusBar.css'
import { SlRefresh } from 'react-icons/sl';
import { MdUsbOff, MdUsb } from 'react-icons/md';
import { BsUsbC} from 'react-icons/bs';
import { useEffect, useState } from 'react';

export default function StatusBar() {
    /**
    * check for serial devices connected to pc
    * @returns list of devices connected
    */
    const [devices, setDevices] = useState([])
    const [selectedPort, setSelectedPort]=useState('')
    

    useEffect(()=>{
        const PORT_SCANNING_INTERVAL = setInterval(async () => {
            const newdevices = await window.AVR_Api.SCAN_ports();
        
            
                setDevices(newdevices)
            
        }, [1000])
        return()=>clearInterval(PORT_SCANNING_INTERVAL)
        
    },[])

    const handleOptionChange=(event)=>{
        setSelectedPort(event.target.value)
    }

    return (
        <div className="statusbarMain">
            <div className="statusbarleft">
                <p>left</p>
            </div>
            <div className="statusbarright">
                <p>right</p>
                
                <span><SlRefresh size={18} /></span>

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
                }
                {
                    devices.length==0 && (<span><MdUsbOff size={18} /></span>)
                }

            </div>
        </div>
    )
}
