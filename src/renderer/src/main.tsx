import React from 'react'
import ReactDOM from 'react-dom/client'
import './assets/index.css'
import App from './App'
import { ContextProvider } from './ContextAPi/context_main';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ContextProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ContextProvider>
  
)
