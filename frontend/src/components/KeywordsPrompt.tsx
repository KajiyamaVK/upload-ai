import { FormEvent, useContext, useRef } from 'react'

import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { GeneralContext } from '@/contexts/generalContext'

interface IProps {
  isDisabled: boolean
}
export function KeywordsPrompt({ isDisabled }: IProps) {
  const { promptInputRef } = useContext(GeneralContext)

  const placeholderContent = isDisabled
    ? 'Select a video to enable this field.'
    : 'Add some keywords mentioned in the video separated by a comma ( , )'

  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Optional keywords</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder={placeholderContent}
          disabled={isDisabled}
        />
      </div>
    </div>
  )
}
