import { Label } from './ui/label'
import { Slider } from './ui/slider'

export function TemperatureSlider() {
  return (
    <div>
      <div className="space-y-4">
        <Label>Temperature</Label>
        <Slider min={0} max={1} step={0.1} />
        <span className="block text-xs text-muted-foreground italic leading-relaxed">
          Higher number let the AI to be more creative but with more of errors
        </span>
      </div>
    </div>
  )
}
