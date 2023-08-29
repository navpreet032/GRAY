import React, { Component } from 'react';
import { ReactTerminal } from "react-terminal";

const Xterminal= () => {
  
  const commands = {
    whoami: "jackharper",
    cd: (directory) => `changed path to ${directory}`
  };
  
    return (
        <ReactTerminal
        commands={commands}
        showControlBar={false}
        theme="dracula"
      />
      
    );
  }

  export default Xterminal;