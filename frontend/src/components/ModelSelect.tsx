import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function ModelSelect() {
  return (
    <div>
      <Label>Model</Label>
      <Select defaultValue="gpt3.5" disabled>
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="gpt3.5">GTP 3.5-turbo 16k</SelectItem>
        </SelectContent>
      </Select>
      <span className="block text-xs text-muted-foreground italic">
        You will be able to customize this option soon.
      </span>
    </div>
  )
}
