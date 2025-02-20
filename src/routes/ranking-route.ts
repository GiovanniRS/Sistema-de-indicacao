import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ranking } from '../functions/ranking'

export const rankingRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/inscritos/ranking',
    {
      schema: {
        summary: 'Acessar o ranking de convites',
        tags: ['ranking'],
        response: {
          200: z.object({
            ranking: z.array(
              z.object({
                id: z.string(),
                nome: z.string(),
                pontos: z.number(),
              })
            ),
          }),
        },
      },
    },
    async () => {
      const { rankingInscritos } = await ranking()

      return { ranking: rankingInscritos }
    }
  )
}
