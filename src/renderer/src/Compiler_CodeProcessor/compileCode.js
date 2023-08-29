// To use this file .It needs to be in 'preload.js'
// To import this file in 'preload.js'. It is first needed to be added(path of file) in tsconfig.node.json file.
// use IPC to communicate b/w frontend and this file
const util = window.require('util');
const exec = util.promisify(window.require('child_process').exec);
const CompileCode = async() =>{

    async ()=>{
        sendCommand(dkflshkjhk)
    }
}
export default CompileCode;