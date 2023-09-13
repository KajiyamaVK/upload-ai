import fs, { createReadStream } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';

import { prisma } from "../lib/prisma";
import { z } from 'zod'
import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { openai } from '../lib/openai';

const pump = promisify(pipeline)

export async function videosRoutes(app: FastifyInstance) {

  const oneMegabyte = 1_048_576

  app.register(fastifyMultipart, {
    limits: {
      fileSize: oneMegabyte * 100,
      files: 1
    }
  })
  app.post('/upload', async (req, res) => {
    const data = await req.file()

    if (!data) {
      return res.status(400).send('No file uploaded')
    }

    const extension = path.extname(data.filename)

    if (extension !== '.mp3') {
      return res.status(400).send('Only mp3 files are accepted. The video must be converted to mp3 before uploading.')
    }

    const fileBaseName = path.basename(data.filename, extension)
    const fileUploadName = `${fileBaseName}-${Date.now()}${extension}`

    const uploadDestination = path.resolve(__dirname, '../', '../', 'audiosTMP/', fileUploadName)

    await pump(data.file, fs.createWriteStream(uploadDestination))

    const video = await prisma.video.create({
      data: {
        name: data.filename,
        path: uploadDestination
      }
    })

    return {
      video
    }
  })

  app.post('/transcript/:videoId', async (req) => {

    const paramsSchema = z.object({
      videoId: z.string().uuid()
    })

    const bodySchema = z.object({
      prompt: z.string(),
    })

    const { videoId } = paramsSchema.parse(req.params)
    const { prompt } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    const videoPath = video.path

    const audioReadStream = createReadStream(videoPath)

    const response = await openai.audio.transcriptions.create({
      file: audioReadStream,
      model: 'whisper-1',
      language: 'pt',
      response_format: 'json',
      temperature: 0.1,
      prompt
    })

    const transcription = response.text

    await prisma.video.update({
      where: {
        id: videoId
      },
      data: {
        transcription: transcription
      }
    })

    return {
      transcription
    }
  })


}

