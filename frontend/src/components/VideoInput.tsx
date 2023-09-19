import { GeneralContext } from '@/contexts/generalContext'
import { highlightFieldWithError } from '@/utils/highlightFieldWithError'
import { FileVideo } from 'lucide-react'
import { ChangeEvent, MouseEventHandler, useContext, useMemo } from 'react'

export function VideoInput() {
  const { setVideoFile, videoFile, setStatus } = useContext(GeneralContext)

  function handleClick() {
    highlightFieldWithError('video', false)
  }

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget

    if (!files) return

    const selectedFile = files[0]

    setVideoFile(selectedFile)
    setStatus('readyForUpload')
  }

  const previewUrl = useMemo(() => {
    if (!videoFile) return null
    return URL.createObjectURL(videoFile)
  }, [videoFile])

  return (
    <div className={'border-2 '} id="video">
      <label
        htmlFor="videoInput"
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
        accept="video/mp4"
        className="sr-only"
        id="videoInput"
        onClick={(e) => handleClick()}
        onChange={(e) => handleFileSelected(e)}
      />
    </div>
  )
}
