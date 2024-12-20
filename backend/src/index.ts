import EnvVariables from './utils/loadEnv'
import { errorHandler } from './middlewares/errorHandler'

import Fastify from 'fastify'
import routes from './routes'

const fastify = Fastify({
  logger: false
})
fastify.setErrorHandler(errorHandler)
fastify.register(routes, { prefix: '/api' })
fastify.listen({ port: EnvVariables.PORT }, (err, address) => {
  if (err) {
    throw err
  }
  console.log(`Server is listening on ${address}`);

})