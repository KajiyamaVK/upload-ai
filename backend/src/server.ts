import { fastify } from 'fastify'
import { promptsRoutes } from './routes/prompts'
import { videosRoutes } from './routes/videos'
import { aiRoutes } from './routes/ai'
import { fastifyCors } from '@fastify/cors'

const app = fastify()

app.register(fastifyCors, {
  origin: '*'
})

app.register(promptsRoutes, {
  prefix: '/prompts'
})

app.register(videosRoutes, {
  prefix: '/videos'
})

app.register(aiRoutes, {
  prefix: '/ai'
})

app.get('/', async () => {
  return 'Welcome to the Writing Prompts API!'
})

app.listen({ port: 4000, }).then(() => {
  console.log('Server is running on http://localhost:4000')
})

