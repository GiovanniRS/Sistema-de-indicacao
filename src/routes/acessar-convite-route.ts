import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { env } from '../env'
import { acessarConvite } from '../functions/acessar-convite'

export const acessarConviteRoute: FastifyPluginAsyncZod = async app => {
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
          302: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { idInscrito } = request.params

      await acessarConvite({ idInscrito })

      const url = new URL(env.WEB_URL)
      url.searchParams.set('remetente', idInscrito)

      return reply.redirect(url.toString(), 302)
    }
  )
}
