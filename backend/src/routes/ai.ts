import fs, { createReadStream } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';

import { prisma } from "../lib/prisma";
import { z } from 'zod'
import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { openai } from '../lib/openai';

export async function aiRoutes(app: FastifyInstance) {
  app.post('/generateIdeas', async (req, res) => {

    const bodySchema = z.object({
      videoId: z.string().uuid(),
      template: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    const { videoId, template, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    if (!video.transcription) {
      return res.status(400).send({ error: "Video transcription not found" })
    }

    const promptMessage = template.replace('{transcription}', video.transcription)

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'user',
          content: promptMessage
        }
      ],
      temperature
    })

    return response

  })


}
