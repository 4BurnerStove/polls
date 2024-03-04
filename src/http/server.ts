import fastify from 'fastify'
import { z } from 'zod'

const app = fastify()

app.post('/polls', (req) => {
    const createPollBody = z.object({
        title: z.string()
    })

    const { title } = createPollBody.parse(req.body)

    console.log(req.body)
})

app.listen({ port:3333 }).then(() => {
    console.log("HTTP Server running")
})

