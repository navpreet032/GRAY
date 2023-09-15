
const util = window.require('util');
const exec = util.promisify(window.require('child_process').exec);

export async function compileCode(InputFile, OutputFile) {
  try {
    // Run AVR-GCC command to compile code
    const { stdout, stderr } = await exec(`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-gcc" -c -g -Os -w -std=gnu++11 -fpermissive -fno-exceptions -ffunction-sections -fdata-sections -fno-threadsafe-statics -Wno-error=narrowing -MMD -flto -mmcu=atmega328p -DF_CPU=16000000L -DARDUINO=10813 -DARDUINO_AVR_NANO -DARDUINO_ARCH_AVR -ID:\\Arduino\\hardware\\arduino\\avr\\cores\\arduino -ID:\\Arduino\\hardware\\arduino\\avr\\variants\\eightanaloginputs "${InputFile}" -o "${OutputFile}.o"`);
    console.log('Compilation success:', stdout);
    return stdout
    
  } catch (error) {
    console.error('Compilation error:', error.stderr);
    return error.stderr
  }
}

export async function burnCode (Filename){
  console.log("Dude ", Filename)
  try {
    // convert .o file to .elf
     await exec (`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-gcc" -g -mmcu=atmega32 -o "${Filename}.elf" "${Filename}.o"`)
    // convert .elf file to .hex
     await exec(`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-objcopy" -j .text -j .data -O ihex "${Filename}.elf" "${Filename}.hex"`)
    // show the size of .elf file
      await exec(`"D:\\Arduino\\hardware\\tools\\avr/bin/avr-size" --format=avr --mcu=atmega32 "${Filename}.elf"`)
    // flash the .hex file to arduino
     const {stdout, stderr} = await exec(`D:\\Arduino\\hardware\\tools\\avr/bin/avrdude -CD:\\Arduino\\hardware\\tools\\avr/etc/avrdude.conf -v -patmega328p -carduino -PCOM6 -b57600 -D -Uflash:w:"${Filename}.hex":i`) 
     console.log(JSON.stringify(stdout, null, 2))
     console.log(JSON.stringify(stderr, null, 2))
     return {stdout, stderr}
  } catch (error) {
    return error.stderr
  }
}


