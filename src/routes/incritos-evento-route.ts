import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const incritosEventoRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/inscritos',
    {
      schema: {
        summary: 'Inscrever pessoas em um evento',
        tags: ['incricao'],
        body: z.object({
          nome: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.object({
            nome: z.string(),
            email: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { nome, email } = request.body
      return reply.status(201).send({
        nome,
        email,
      })
    }
  )
}
