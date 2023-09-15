import { useDataPipeline } from '../../ContextAPi/context_main'
import './terminal.css'
export default function Terminal() {
    const {CMD_data} = useDataPipeline()
    const data = `
    AVR Memory Usage
    ----------------
    Device: atmega32
    
    Program:     156 bytes (0.5% Full)
    (.text + .data + .bootloader)
    
    Data:          0 bytes (0.0% Full)
    (.data + .bss + .noinit)`
  return (
    <div className='cmd'>
       {
        CMD_data
        
       }</div>
  )
}
