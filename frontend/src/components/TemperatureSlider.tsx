import { useContext, useState } from 'react'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { GeneralContext } from '@/generalContext'

export function TemperatureSlider() {
  const { temperature, setTemperature } = useContext(GeneralContext)

  return (
    <div>
      <div className="space-y-4">
        <Label>Creativity</Label>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={[temperature]}
          onValueChange={(value) => [setTemperature(value[0])]}
        />
        <span className="block text-xs text-muted-foreground italic leading-relaxed">
          Higher number let the AI be more creative but with less accuracy
        </span>
      </div>
    </div>
  )
}
