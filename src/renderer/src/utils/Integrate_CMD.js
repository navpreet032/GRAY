const util = window.require('util');
const exec = util.promisify(window.require('child_process').exec)
export const CMD = ()=>{
    const { stdout, stderr } =  exec("start cmd.exe /K node cd Desktop");

    console.log(stdout)
}