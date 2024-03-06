import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function getPoll(app: FastifyInstance) {
    app.post('/polls/:pollId', async (req, reply) => {
        const getPollParams = z.object({
            pollId: z.string().uuid()
        })
    
        const { pollId } = getPollParams.parse(req.params)
    
        const poll = await prisma.poll.findUnique({
            where: {
                id: pollId,
            }
        })
    
        return reply.send({ poll })
    })
}