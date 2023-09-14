import { GeneralContext } from '@/generalContext'
import { FileVideo } from 'lucide-react'
import { ChangeEvent, useContext, useMemo, useRef, useState } from 'react'

export function VideoInput() {
  const { setVideoFile, videoFile } = useContext(GeneralContext)

  function handleFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.currentTarget

    if (!files) return

    const selectedFile = files[0]

    setVideoFile(selectedFile)
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <div>
      <label
        htmlFor="video"
        className="relative border flex rounded-md aspect-video cursor-pointer border-dashed text-sm flex-col gap-2 items-center justify-center text-muted-foreground hover:bg-primary/5 hover:font-bold hover:text-md object-fill overflow-hidden"
      >
        {previewUrl ? (
          <video
            src={previewUrl}
            controls={false}
            className="pointer-events-none absolute object-fill "
          />
        ) : (
          <>
            <FileVideo className="w-12 h-12" />
            Click to upload a video
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={(e) => handleFileSelected(e)}
      />
    </div>
  )
}
