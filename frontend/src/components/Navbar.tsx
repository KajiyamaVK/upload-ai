import { Github } from 'lucide-react'
import { Button } from './ui/button'
import { Separator } from '@radix-ui/react-separator'

export function Navbar() {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
      <h1 className="text-xl font-bold">upload.Ai</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">
          Powered by Fullstacker Intel
        </span>
        <Separator orientation="vertical" className="h-6" />
        <Button variant={'outline'}>
          <Github className="w-4 h-4 mr-2" />
          Github Repository
        </Button>
      </div>
    </div>
  )
}
