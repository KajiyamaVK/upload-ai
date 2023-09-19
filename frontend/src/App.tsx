import './index.css'
import { AsideColumn } from './components/AsideColumn'
import { MainContent } from './components/MainContent'
import { Navbar } from './components/Navbar'
import { DialogBox } from './components/DialogBox'
import { useContext } from 'react'
import { DialogBoxContext } from './contexts/dialogBoxContext'

export function App() {
  const { dialogBox } = useContext(DialogBoxContext)
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        <AsideColumn />
        <MainContent />
      </main>
      <DialogBox {...dialogBox} />
    </div>
  )
}
