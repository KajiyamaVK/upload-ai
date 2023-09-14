import { Upload, Wand2 } from 'lucide-react'
import { TranscriptionPrompt } from './TranscriptionPrompt'
import { VideoInput } from './VideoInput'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { PromptsSelect } from './PromptsSelect'
import { ModelSelect } from './ModelSelect'
import { TemperatureSlider } from './TemperatureSlider'
import { FormEvent, useContext, useEffect, useState } from 'react'
import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'
import { GeneralContext } from '@/generalContext'
import { api } from '@/lib/axios'
import { Toaster } from './ui/toaster'
import { useToast } from './ui/use-toast'

type statusType = 'idle' | 'converting' | 'uploading' | 'generating' | 'success'

export function AsideColumn() {
  const { videoFile, promptInputRef, setVideoId, handleSubmit, isLoading } =
    useContext(GeneralContext)
  const [status, setStatus] = useState<statusType>('idle')
  const { toast } = useToast()
  useEffect(() => {
    if (status === 'success') {
      showToaster()
    }
  }, [status])

  function showToaster() {
    toast({
      title: 'Upload successful',
      description: 'Your video is now available to be used in the prompt.',
    })
  }

  const isUploadButtonDisabled = status !== 'idle' && status !== 'success'

  const loadingSpinner = (
    <div
      className={`animate-spin flex rounded-full w-6 h-6 bg-gradient-to-tr from-indigo-500 to-black mr-2`}
    >
      <div className="h-4 w-4 rounded-full m-auto bg-blue-600"></div>
    </div>
  )

  async function convertVideoToAudio(video: File) {
    console.log('Convert Started')
    const ffmpeg = await getFFmpeg()
    await ffmpeg.writeFile('input.mp4', await fetchFile(video))

    // If you want to see the logs, uncomment the line below
    // ffmpeg.on('log', (msg) => console.log(msg))

    ffmpeg.on('progress', (progress) => {
      console.log(
        'Convert Progress: ' + Math.round(progress.progress * 100) + '%',
      )
    })

    const inputFilePath = 'input.mp4'
    const outputFilePath = 'output.mp3'
    const audioBitrate = '20k'

    const ffmpegArgs = [
      '-i',
      inputFilePath, // input file
      '-map',
      '0:a', // include only audio stream
      '-b:a',
      audioBitrate, // set audio bitrate
      '-vn', // exclude video stream
      '-acodec',
      'libmp3lame', // set audio codec
      outputFilePath, // output file
    ]

    await ffmpeg.exec(ffmpegArgs)

    const data = await ffmpeg.readFile(outputFilePath)

    const audioFileBlob = new Blob([data], { type: 'audio/mpeg' })
    const audioFile = new File([audioFileBlob], 'output.mp3', {
      type: 'audio/mpeg',
    })

    console.log('Convert Finished')

    return audioFile
  }
  async function handleUploadVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('videoFile')
    const prompt = promptInputRef.current?.value
    if (!videoFile) return

    setStatus('converting')
    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)

    setStatus('uploading')
    const response = await api.post(`/videos/upload`, data)

    setVideoId(response.data.video.id)

    setStatus('generating')
    await api.post(`/videos/transcript/${response.data.video.id}`, {
      prompt,
    })

    setStatus('success')
  }

  function handleSubmit2(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log('handleSubmit2')
    debugger
    handleSubmit(e)
  }

  return (
    <div>
      <aside className="w-80 space-y-6">
        <form className="space-y-6 " onSubmit={handleUploadVideo}>
          <VideoInput />

          <Separator />

          <TranscriptionPrompt isDisabled={isUploadButtonDisabled} />
          <Button
            className="w-full"
            type="submit"
            disabled={isUploadButtonDisabled}
          >
            {isUploadButtonDisabled && loadingSpinner}
            {isUploadButtonDisabled ? status : `Upload new video`}
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <Separator />
        <form className="space-y-6" onSubmit={handleSubmit2}>
          <div className="space-y-2">
            <PromptsSelect />
          </div>
          <div className="space-y-2">
            <ModelSelect />
          </div>

          <Separator />
          <TemperatureSlider />
          <Separator />
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && loadingSpinner}
            {isLoading ? status : `Execute`}
            <Wand2 className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <Toaster />
      </aside>
    </div>
  )
}
