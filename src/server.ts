import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod';
import { fastifySwagger } from '@fastify/swagger';
import { fastifySwaggerUi } from '@fastify/swagger-ui';
import { incritosEventoRoute } from './routes/incritos-evento-route';
import { env } from './env';

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
    origin: 'http://localhost:3333'
});

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'Sistema de indicacao',
            version: '0.0.1'
        }
    },
    transform: jsonSchemaTransform
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs'
});

app.register(incritosEventoRoute);

app.listen({ port: env.PORT }).then(() => {
    console.log('HTTP server running!')
});