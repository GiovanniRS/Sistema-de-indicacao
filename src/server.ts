import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { acessarConviteRoute } from './routes/acessar-convite-route'
import { clicksConviteRoute } from './routes/clicks-convite-route'
import { contConviteRoute } from './routes/cont-convite-route'
import { participarEventoRoute } from './routes/participar-evento-route'
import { posicaoRankingRoute } from './routes/posicao-ranking-route'
import { rankingRoute } from './routes/ranking-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
  origin: 'http://localhost:3333',
})

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Sistema de indicacao',
      version: '0.0.1',
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
})

app.register(participarEventoRoute)
app.register(acessarConviteRoute)
app.register(clicksConviteRoute)
app.register(contConviteRoute)
app.register(posicaoRankingRoute)
app.register(rankingRoute)

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP server running!')
})
