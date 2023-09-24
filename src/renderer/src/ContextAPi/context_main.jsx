import React, { createContext, useContext, useState } from 'react';

const Data_pipe = createContext();

export const ContextProvider = ({ children }) => {
  // root folder selected via openfolderdialogbox
  const [rootDir, setRootDir] = useState('');
  // current selected file in file explorer
  const [selectedFile, setSelectedFile, ] = useState('');
  // to check if save button is clicked or not
  const [IS_save_clicked, setIS_save_clicked] = useState(false);
  // to transport the Data to Terminal
  const [CMD_data , setCMDdata] = useState('grayByteStudio');
  // to get Curret selected Board type ex: Arduino nano
  const [CurrentSelectedBoard, setCurrentSelectedBoard] = useState('');
  

  const SET_rootDir = (dir) => {
    setRootDir(dir);
  };
  const SET_selectedFile =(path)=>{
    setSelectedFile(path);
  }
  const SET_is_save_clicked=(bool)=>{
    setIS_save_clicked(bool)
  }

  const SET_currentSelectedBoard=(board)=>{
    setCurrentSelectedBoard(board);
  }
  
  const value = { rootDir, SET_rootDir, selectedFile, SET_selectedFile, IS_save_clicked, SET_is_save_clicked, CMD_data, setCMDdata,CurrentSelectedBoard, SET_currentSelectedBoard}; // Create a value object

  return (
    <Data_pipe.Provider value={value}>
      {children}
    </Data_pipe.Provider>
  );
};

export const useDataPipeline = () => {
  return useContext(Data_pipe);
};
