import Editor from "@renderer/components/textEditor/use-codemirror"
import "./master.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import FileExplorer from "../components/fileExplorer/fileExplorer";
import Menubar from "../components/menubar/menubar";


const Master = () => {
    const ref = useRef(null);

    const [width, setWidth] = useState(20);
    const [height, setHeight] = useState(100);

    const handleResize = () => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.clientHeight);
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
                    <div className="editor" ref={ref}>
                        <Editor height={height} width={width}  />

                    </div>
                    <div className='terminal'>
                        <p>Terminal</p>
                    </div>
                </div>

                <div className='statusbar'> 
                    <p>statusbar</p>
                </div>
            </div>
        </div>

    )
}

export default Master