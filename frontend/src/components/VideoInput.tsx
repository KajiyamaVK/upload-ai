import { FileVideo } from 'lucide-react'

export function VideoInput() {
  return (
    <div>
      <label
        htmlFor="video"
        className="border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 hover:font-bold hover:text-md"
      >
        <FileVideo className="w-12 h-12" />
        Click to upload a video
      </label>
      <input type="file" id="video" accept="video/mp4" className="sr-only" />
    </div>
  )
}
