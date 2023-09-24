// TODO ADD BOARD NAMES and there settings TO JSON FILE AND CONNECT THEM TO MENU BAR
// !IMP https://github.com/arduino/ArduinoCore-avr/blob/master/boards.txt
// ?DOCS https://arduino.github.io/arduino-cli/0.34/platform-specification/
// ?PROGRESS PORTAL https://github.com/users/navpreet032/projects/1/views/2
/**
 * ? programmers.txt ⇒ contains config for external hardware or software tools used to programe microcontrollers
 * ? board.txt ⇒ it specifies the board's name, microcontroller type, clock speed, parameters for building and uploading sketches (code), and other configuration settings relevant to that specific board.
 * ? platform.txt ⇒  contains definitions for the CPU architecture used (compiler, build process parameters, tools used for upload, etc. EX what will be the flgs if using C++ or C file
 * todo set error handling if "compile" is pressed but "processor" is not selected ⚠ Do SAME FOR " mcu, f_cpu, buildBoard"
 */

import AVRconfig from '../config/system_config.json'
import Boards from '../config/boards.json'

const util = window.require('util');
const exec = util.promisify(window.require('child_process').exec);
let mcu, f_cpu, buildBoard ,processor=null ;
export function setProcessor(chip){processor = chip;console.log("CHIP ", processor)}
export async function ReadDataFromBoardJSON (Boardname){
 mcu = (Boards[Boardname].hasOwnProperty("build") && typeof Boards[Boardname]['build'] === "object" ) ? Boards[Boardname].build.mcu : Boards[Boardname].build_mcu
 f_cpu = (Boards[Boardname].hasOwnProperty("build") && typeof Boards[Boardname]['build'] === "object" ) ? Boards[Boardname].build.f_cpu : Boards[Boardname].build_f_cpu
 buildBoard = (Boards[Boardname].hasOwnProperty("build") && typeof Boards[Boardname]['build'] === "object" ) ? Boards[Boardname].build.board : Boards[Boardname].build_board
console.log(mcu, f_cpu, buildBoard)
}

export async function compileCode(InputFile, OutputFile) {
  
  try {
    // * Read avr-gcc path from system_config.json
    const avr_gccPath = AVRconfig[0].AVR_paths_config.compiler;
    // Run AVR-GCC command to compile code
    if( mcu != null || f_cpu != null || buildBoard != null ){
      const { stdout, stderr } = await exec(`"${avr_gccPath}" -c -g -Os -w -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -MMD -flto -mmcu=${mcu} -DF_CPU=${f_cpu} -DARDUINO=10813 -D${buildBoard} -DARDUINO_ARCH_AVR -ID:\\Arduino\\hardware\\arduino\\avr\\cores\\arduino -ID:\\Arduino\\hardware\\arduino\\avr\\variants\\eightanaloginputs "${InputFile}" -o "${OutputFile}.o"`);
      console.log('Compilation success:', stdout);
      return stdout
    }
    console.log("Error mcu, f_cpu, buildBoard is null" )
    
  } catch (error) {
    console.error('Compilation error:', error.stderr);
    return error.stderr
  }
  
}

export async function burnCode (Filename){
  // ? console.log("Dude ", Filename)

  const {avrDude, avrdudeConf} = AVRconfig[0].AVR_paths_config;
  try {
    // convert .o file to .elf
     await exec (`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-gcc" -g -mmcu=atmega32 -o "${Filename}.elf" "${Filename}.o"`)
    // convert .elf file to .hex
     await exec(`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-objcopy" -j .text -j .data -O ihex "${Filename}.elf" "${Filename}.hex"`)
    // show the size of .elf file
      await exec(`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-size" --format=avr --mcu=atmega32 "${Filename}.elf"`)
    // flash the .hex file to arduino
     const {stdout, stderr} = await exec(`${avrDude} -C${avrdudeConf} -v -patmega328p -carduino -PCOM6 -b57600 -D -Uflash:w:"${Filename}.hex":i`) 
     console.log(JSON.stringify(stdout, null, 2))
     console.log(JSON.stringify(stderr, null, 2))
     return {stdout, stderr}
  } catch (error) {
    return error.stderr
  }
}


