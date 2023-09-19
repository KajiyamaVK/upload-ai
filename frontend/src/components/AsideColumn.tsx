import { Upload } from 'lucide-react'
import { KeywordsPrompt } from './KeywordsPrompt'
import { VideoInput } from './VideoInput'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import { FormEvent, useContext, useState } from 'react'
import { GeneralContext } from '@/contexts/generalContext'
import { api } from '@/lib/axios'
import { LoadingSpinner } from './LoadingSpinner'
import { convertVideoToAudio } from '@/utils/convertVideoToAudio'
import { DialogBoxContext } from '@/contexts/dialogBoxContext'
import { highlightFieldWithError } from '@/utils/highlightFieldWithError'

export function AsideColumn() {
  const { videoFile, promptInputRef, setVideoId, status, setStatus } =
    useContext(GeneralContext)

  const { showDialogBox, dialogBox } = useContext(DialogBoxContext)

  async function handleUploadVideo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const prompt = promptInputRef.current?.value

    if (status === 'success') {
      showDialogBox({
        title: 'Already uploaded',
        description:
          'The video has already been uploaded. If you want to upload a new video, please select a new file.',
        open: true,
        action: 'Ok',
        isError: true,
        onAction: () => {
          showDialogBox({
            ...dialogBox,
            open: false,
            onAction: () => {
              showDialogBox({
                ...dialogBox,
                open: false,
              })
              highlightFieldWithError('video', true)
            },
          })
        },
      })
      return
    } else if (!videoFile) {
      showDialogBox({
        title: 'No video selected',
        description: 'Select a video to upload.',
        open: true,
        action: 'Ok',
        isError: true,
        onAction: () => {
          showDialogBox({
            ...dialogBox,
            open: false,
          })
          highlightFieldWithError('video', true)
        },
      })
      return
    }

    setStatus('converting')
    console.log('converting video to audio')
    const audioFile = await convertVideoToAudio(videoFile)

    const data = new FormData()

    data.append('file', audioFile)
    console.log('uploading audio file')
    setStatus('uploading')
    const response = await api.post(`/videos/upload`, data)

    setVideoId(response.data.video.id)

    setStatus('generating')
    await api.post(`/videos/transcript/${response.data.video.id}`, {
      prompt,
    })

    setStatus('success')
  }

  let uploadButtonLabel = ''
  let isHidden = false

  switch (status) {
    case 'idle':
      uploadButtonLabel = 'Upload new video'
      isHidden = true
      break
    case 'readyForUpload':
      uploadButtonLabel = 'Upload new video'
      isHidden = true
      break
    case 'converting':
      uploadButtonLabel = 'Converting...'
      isHidden = false
      break
    case 'uploading':
      uploadButtonLabel = 'Uploading...'
      isHidden = false
      break
    case 'generating':
      isHidden = false
      uploadButtonLabel = 'Generating...'
      break
    case 'success':
      uploadButtonLabel = 'Success'
      isHidden = true
      break
  }

  return (
    <div>
      <aside className="w-80 space-y-6">
        <form className="space-y-6 " onSubmit={handleUploadVideo}>
          <VideoInput />

          <Separator />

          <KeywordsPrompt isDisabled={videoFile === null} />
          <Button
            className="w-full"
            type="submit"
            title='Select a video to enable the "Upload" button.'
            id="upload-button"
            disabled={!isHidden}
          >
            <LoadingSpinner isHidden={isHidden} />
            {uploadButtonLabel}
            <Upload className="w-4 h-4 ml-2" />
          </Button>
        </form>
        <Separator />

        <Separator />
      </aside>
    </div>
  )
}
