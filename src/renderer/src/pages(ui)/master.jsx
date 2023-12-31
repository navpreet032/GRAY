import "./master.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import FileExplorer from "../components/fileExplorer/fileExplorer";
import Menubar from "../components/menubar/menubar";
import Terminal from "../components/terminal/terminal";
import StatusBar from "../components/statusBar/statusBar";
import MonacoEditor from "../components/textEditor/MonacoEditor";
import OpendFiles from "../components/opendFilesBar/opendFiles";


const Master = () => {
    const ref = useRef(null);

    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(100);
    

    const handleResize = () => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.clientHeight);
        console.log("MASTER")
    }
    
    

    useEffect(() => {
        // Initial setup
        handleResize();

        // Attach event listener for window resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (

        <div>
            <div>

                <Menubar/>
            </div>
            
            <div className='master'>
                <div className='explorer' >
                    <FileExplorer/>
                </div>

                <div className='viewport' >
                    <div className="filestatus">
                        <OpendFiles/>
                    </div>
                    <div className="editor" ref={ref}>
                        
                        <MonacoEditor height={height} width={width}/>
                    </div>
                    <div className='terminal'>
                        <Terminal/>
                        
                    </div>
                </div>

                <div className='statusbar'> 
                    <StatusBar/>
                </div>
            </div>
        </div>

    )
}

export default Master