import { useContext, useEffect, useState } from 'react'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'
import { api } from '@/lib/axios'
import { GeneralContext } from '@/generalContext'

interface IPrompt {
  id: string
  title: string
  template: string
}

export function PromptsSelect() {
  const [prompts, setPrompts] = useState<IPrompt[] | null>(null)
  const { setInput } = useContext(GeneralContext)

  useEffect(() => {
    api.get('/prompts').then((res) => {
      setPrompts(res.data)
    })
  }, [])

  return (
    <div className="w-80 h-fit">
      <Label>Prompts Template</Label>
      <Select onValueChange={setInput}>
        <SelectTrigger>
          <SelectValue placeholder="Select a prompt (optional)" />
        </SelectTrigger>
        <SelectContent>
          {prompts?.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.title}>
              {prompt.title}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
