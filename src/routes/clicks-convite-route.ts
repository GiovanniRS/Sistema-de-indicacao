import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { clicksConvite } from '../functions/clicks-convite'

export const clicksConviteRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/inscritos/:idInscrito/ranking/clicks',
    {
      schema: {
        summary: 'Acessar quantidade de cliques nos link de convite',
        tags: ['indicacao'],
        params: z.object({
          idInscrito: z.string(),
        }),
        response: {
          200: z.object({
            cont: z.number(),
          }),
        },
      },
    },
    async request => {
      const { idInscrito } = request.params

      const { cont } = await clicksConvite({ idInscrito })

      return { cont }
    }
  )
}
