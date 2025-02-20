import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { contConvite } from '../functions/cont-convite'

export const contConviteRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/inscritos/:idInscrito/ranking/cont',
    {
      schema: {
        summary: 'Acessar quantidade de inscritos por link de convite',
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

      const { cont } = await contConvite({ idInscrito })

      return { cont }
    }
  )
}
