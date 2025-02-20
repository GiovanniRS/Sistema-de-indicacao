import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { clicksLinkConvite } from '../functions/clicks-link-convite'

export const clicksLinkConviteRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/inscritos/:idInscrito/ranking/clicks',
    {
      schema: {
        summary:
          'Acessar quantidade de cliques de inscritos por link de convite',
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

      const { cont } = await clicksLinkConvite({ idInscrito })

      return { cont }
    }
  )
}
