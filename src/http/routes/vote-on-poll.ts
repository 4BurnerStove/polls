import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (req, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()        
        })

        const { pollOptionId } = voteOnPollBody.parse(req.body)
        const { pollId } = voteOnPollParams.parse(req.params)
    
    
        return reply.status(201).send()
    })
}