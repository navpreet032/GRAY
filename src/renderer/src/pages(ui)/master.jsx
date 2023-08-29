import Editor from "@renderer/components/textEditor/use-codemirror"
import Xterminal from "@renderer/components/terminal/Xterminal"
import "./master.css"
import { useEffect, useLayoutEffect, useRef, useState } from "react"

const Master = () =>  {
    const ref = useRef(null);

    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
  
    const handleResize =()=>{
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
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
            <div className='menu'>
                <div className='left'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtlSQKbmPBF-9Iq9kqMmY7EF8oca_HtVyKA49aysagzw&s" alt="menu" />
            <p className='options'>File</p>
            <p className='options'>Edit</p>
            <p className='options'>View</p>
            <p className='options'>Go</p>
                </div>
            
            </div>
        <div className='master'>
        <div className='explorer' >
            <p> Explorer</p> 
        </div>

        <div className='viewport' ref={ref}>
            
            <Editor height={height} width={width}  ref={ref}/>
            
            
            <div className='terminal'>
            <Xterminal/>
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