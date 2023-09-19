import { getFFmpeg } from '@/lib/ffmpeg'
import { fetchFile } from '@ffmpeg/util'

export async function convertVideoToAudio(video: File) {
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
