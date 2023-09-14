import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function PromptsSelect() {
  return (
    <div>
      <Label>Prompt</Label>
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select a prompt" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="title-select-option">
            YouTube Video Title
          </SelectItem>
          <SelectItem value="name-select-option">YouTube Video Name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
