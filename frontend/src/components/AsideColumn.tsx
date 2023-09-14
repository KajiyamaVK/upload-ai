import { Upload, Wand2 } from 'lucide-react'
import { TranscriptionPrompt } from './TranscriptionPrompt'
import { VideoInput } from './VideoInput'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { PromptsSelect } from './PromptsSelect'
import { ModelSelect } from './ModelSelect'
import { TemperatureSlider } from './TemperatureSlider'

export function AsideColumn() {
  return (
    <div>
      <aside className="w-80 space-y-6">
        <form className="space-y-6 ">
          <VideoInput />

          <Separator />

          <TranscriptionPrompt />
          <Button className="w-full" type="submit">
            Upload video <Upload className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <Separator />
        <form action="" className="space-y-6">
          <div className="space-y-2">
            <PromptsSelect />
          </div>
          <div className="space-y-2">
            <ModelSelect />
          </div>

          <Separator />
          <TemperatureSlider />
          <Separator />
          <Button type="submit" className="w-full">
            Execute
            <Wand2 className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </aside>
    </div>
  )
}
