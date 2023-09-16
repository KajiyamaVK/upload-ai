import './index.css'
import { AsideColumn } from './components/AsideColumn'
import { MainContent } from './components/MainContent'
import { useToast } from './components/ui/use-toast'
import { Navbar } from './components/Navbar'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'

export function App() {
  const { toast } = useToast()
  function showToaster() {
    toast({
      title: 'Upload successful',
      description: 'Your video is now available to be used in the prompt.',
    })
  }

  useEffect(() => {
    showToaster()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 p-6 flex gap-6">
        <AsideColumn />
        <MainContent />
      </main>
      <Toaster />
    </div>
  )
}
