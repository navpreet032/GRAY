import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { TerminalContextProvider } from "react-terminal";


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TerminalContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </TerminalContextProvider>
)
