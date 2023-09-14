import { FormEvent, useContext, useRef } from 'react'

import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { GeneralContext } from '@/generalContext'

interface IProps {
  isDisabled: boolean
}
export function TranscriptionPrompt({ isDisabled }: IProps) {
  const { promptInputRef } = useContext(GeneralContext)

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Transcriptions prompts</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Add some keywords mentioned in the video separated by a comma ( , )"
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}
