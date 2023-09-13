import { fastify } from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'Hello World'
})

app.listen({ port: 4000, }).then(() => {
  console.log('Server is running on http://localhost:4000')
}
)