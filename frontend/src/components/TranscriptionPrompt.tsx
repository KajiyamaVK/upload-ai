import { Label } from './ui/label'
import { Textarea } from './ui/textarea'

export function TranscriptionPrompt() {
  return (
    <div>
      <div className="space-y-2">
        <Label htmlFor="transcription-prompt">Transcriptions prompts</Label>
        <Textarea
          id="transcription-prompt"
          className="h-20 leading-relaxed resize-none"
          placeholder="Add some keywords mentioned in the video separated by a comma ( , )"
        />
      </div>
    </div>
  )
}
