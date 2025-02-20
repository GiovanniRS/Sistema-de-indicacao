import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { participarEvento } from '../functions/participar-evento'

export const participarEventoRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/inscritos',
    {
      schema: {
        summary: 'Inscrever pessoas em um evento',
        tags: ['inscricao'],
        body: z.object({
          nome: z.string(),
          email: z.string().email(),
          remetente: z.string().nullish(),
        }),
        response: {
          201: z.object({
            idInscrito: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { nome, email, remetente } = request.body

      const { idInscrito } = await participarEvento({
        nome,
        email,
        remetente,
      })

      return reply.status(201).send({
        idInscrito,
      })
    }
  )
}
