import { VscFile} from 'react-icons/vsc';
import {CgCPlusPlus} from 'react-icons/cg';
import {BsFiletypeTxt} from 'react-icons/bs';

// function that returns the icon based on the file type
const checkFileType=(file)=>{
        
    let type = file.substring(file.indexOf('.'), file.length);
    console.log("Type ",type)
    const typesIcon={
        '.cpp' : <CgCPlusPlus color='#005f91'/>,
        '.c' : <CgCPlusPlus color='#005f91' size={24}/>,
        '.c++' :<CgCPlusPlus/>,
        '.txt':<BsFiletypeTxt color='#869fc0'/>
    }
    // if there is icon of given type: 
    if(typesIcon[type])
        return typesIcon[type];
    // if there no icon of given type: 
    return <VscFile color='#c09553'/>
  }
  export default checkFileType;