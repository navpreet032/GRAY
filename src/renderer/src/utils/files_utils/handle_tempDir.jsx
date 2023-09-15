import { mkdir } from "fs/promises";
import { useDataPipeline } from "../../ContextAPi/context_main";


export const make_temp_dir = (rootDir)=>{
   
    let projectname = rootDir.substring(rootDir.lastIndexOf('\\')+1, rootDir.length);
    projectname += 'temp';

    // set projectname in context api and also drive the temp output file name from it.

    try {
         mkdir(`C:\\Windows\\Temp\\${projectname}`); 
         return 'C:/Windows/Temp/'+projectname;
        
    } catch (error) {
        throw error;
    }
}