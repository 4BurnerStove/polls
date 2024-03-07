import { z } from "zod"
import { randomUUID } from "node:crypto"
import { prisma } from "../../lib/prisma"
import { FastifyInstance } from "fastify"

export async function voteOnPoll(app: FastifyInstance) {
    app.post('/polls/:pollId/votes', async (request, reply) => {
        const voteOnPollBody = z.object({
            pollOptionId: z.string().uuid()
        })

        const voteOnPollParams = z.object({
            pollId: z.string().uuid()        
        })

        const { pollOptionId } = voteOnPollBody.parse(request.body)
        const { pollId } = voteOnPollParams.parse(request.params)

         let { sessionId } = request.cookies

         if (!sessionId){
            sessionId = randomUUID()
         
            reply.setCookie('sessionId', sessionId, {
               path: '/',
               maxAge: 60 * 60 * 24 * 30, // 30 days
               signed: true,
               httpOnly: true,
            })
         }
         
         await prisma.vote.create({
            data: {
                sessionId: sessionId,
                pollId: pollId,
                pollOptionId: pollOptionId
            }
        });

        return reply.status(201).send()
    })
}