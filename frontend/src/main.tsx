import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import './index.css'
import { GeneralProvider } from './contexts/generalContext.tsx'
import { DialogBoxProvider } from './contexts/dialogBoxContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <DialogBoxProvider>
      <GeneralProvider>
        <App />
      </GeneralProvider>
    </DialogBoxProvider>
  </React.StrictMode>,
)
