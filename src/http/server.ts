import fastify from 'fastify'

const app = fastify()

app.post('/polls', (req) => {
    console.log(req.body)
   
})

app.listen({ port:3333 }).then(() => {
    console.log("HTTP Server running")
})

