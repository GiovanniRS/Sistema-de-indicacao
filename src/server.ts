import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

const app = fastify()

app.register(fastifyCors, {
    origin: 'http://localhost:3333'
})

app.get('/hello', () => {
    return 'hello word'
})

app.listen({ port: 3333 }).then(() => {
    console.log('HTTP server running!')
})