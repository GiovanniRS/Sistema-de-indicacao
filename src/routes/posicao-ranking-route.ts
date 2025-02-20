import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { posicaoRanking } from '../functions/posicao-ranking'

export const posicaoRankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/inscritos/:idInscrito/ranking/posicao',
    {
      schema: {
        summary: 'Acessar a posicao no ranking do inscrito',
        tags: ['ranking'],
        params: z.object({
          idInscrito: z.string(),
        }),
        response: {
          200: z.object({
            posicao: z.number().nullable(),
          }),
        },
      },
    },
    async request => {
      const { idInscrito } = request.params

      const { posicao } = await posicaoRanking({ idInscrito })

      return { posicao }
    }
  )
}
