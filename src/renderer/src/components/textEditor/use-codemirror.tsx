/**
 * Themes : https://uiwjs.github.io/react-codemirror/#/theme/data/sublime
 * Examples : https://codemirror.net/examples/
*/

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import { tags as t } from '@lezer/highlight';

import { sublime, sublimeInit } from '@uiw/codemirror-theme-sublime';
import { dracula, draculaInit } from '@uiw/codemirror-theme-dracula';


export default function Editor({height, width}) {
  const onChange = React.useCallback((value, viewUpdate) => {
    console.log("value:", value);
  }, []);



  
  const CODE = `#ifndef F_CPU
#define F_CPU 16000000UL // Set your microcontroller's clock frequency
#endif

#include <avr/io.h>
#include <util/delay.h>

int main(void)
{
    DDRB |= (1 << DDB5); // Set pin 13 (PB5) as an output

    while (1)
    {
        PORTB |= (1 << PORTB5); // Turn on the LED (HIGH)
        _delay_ms(500);         // Wait for 500 milliseconds

        PORTB &= ~(1 << PORTB5); // Turn off the LED (LOW)
        _delay_ms(500);          // Wait for 500 milliseconds
    }

    return 0;
}

  `
  return (
    
   
    
      <CodeMirror
        value={CODE}
        height = {height+'px'}
        width = {width+'px'}
        theme={sublimeInit({
          settings: {
            caret: 'grey',
            fontFamily: 'monospace',
          },
          styles: [
            { tag: t.comment, color: 'orange' },
          ]
        })}
        extensions={[cpp()]} 
        onChange={onChange}
      />
    
  );
}
