import fs, { createReadStream } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util';
import { pipeline } from 'node:stream';
import { streamToResponse, OpenAIStream } from 'ai'
import { prisma } from "../lib/prisma";
import { z } from 'zod'
import { FastifyInstance } from "fastify";
import { fastifyMultipart } from '@fastify/multipart'
import { openai } from '../lib/openai';

export async function aiRoutes(app: FastifyInstance) {
  app.post('/generateResponse', async (req, res) => {

    const bodySchema = z.object({
      videoId: z.string().uuid(),
      prompt: z.string(),
      temperature: z.number().min(0).max(1).default(0.5),
    })

    let { videoId, prompt, temperature } = bodySchema.parse(req.body)

    const video = await prisma.video.findUniqueOrThrow({
      where: {
        id: videoId
      }
    })

    if (!video.transcription) {
      return res.status(400).send({ error: "Video transcription not found" })
    }
    const wordsToChange = ['vídeo', 'video']

    console.log('prompt', prompt)

    //replace in template if template has wordsToChange to "texto"

    console.log('prompt2', prompt)

    //const promptMessage = template.replace('{transcription}', video.transcription)
    const promptMessage = `
    Baseado no conteúdo abaixo, que é proveniente do conteúdo de um vídeo, responda ao meu pedido ou pergunta que virá logo depois.\n
    Responda sempre no mesmo idioma no qual o pedido ou pergunta foi feito. 
    Se perguntarem em inglês, responda em inglês. Se perguntarem em português, responda em português. Japonês, responda em japonês (e assim por diante)\n\n

    Por exemplo, se o conteúdo abaixo for em português e o pedido ou pergunta for em inglês, responda em inglês.\n\n

    Caso meu pedido ou pergunta não tiver relação ao texto, responda apenas "hm. Não saberei como lhe responder. Gostaria de falar com um atendente?" (No respectivo idioma do pedido/pergunta)\n\n

    Lembre-se - o conteúdo é proveniente de um vídeo que foi transformado em texto, portanto, a pergunta pode ser direcionada à palavra "vídeo". Sempre se refira ao conteúdo como "conteúdo" - mesmo que eu chame o conteúdo de "vídeo" ou "texto"\n\n
    

    Conteúdo: '''${video.transcription}'''\n\n

    Pedido / Pergunta : ${prompt}

    `

    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo-16k',
      messages: [
        {
          role: 'user',
          content: promptMessage
        }
      ],
      temperature,
      stream: true
    })

    const stream = OpenAIStream(response)

    streamToResponse(stream, res.raw, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
      }
    })

  })


}
