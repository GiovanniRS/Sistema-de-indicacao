import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'

export const acessarLinkConviteRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/convite/:idInscrito',
    {
      schema: {
        summary: 'Acessar link de indicacao e redirecionar usuario',
        tags: ['indicacao'],
        params: z.object({
          idInscrito: z.string(),
        }),
        response: {
          201: z.object({
            idInscrito: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { idInscrito } = request.params

      const url = new URL(env.WEB_URL)
      url.searchParams.set('referrer', idInscrito)

      return reply.redirect(url.toString(), 302)
    }
  )
}
