import Fastify from 'fastify'
import EnvVariables from './utils/loadEnv'
import { errorMiddleware } from './middlewares/errorMiddleware'
import { serializerCompiler, validatorCompiler, type ZodTypeProvider } from 'fastify-type-provider-zod'
import routes from './routes'

const fastify = Fastify({
  logger: false
}).withTypeProvider<ZodTypeProvider>().register(routes, { prefix: '/api', })
fastify.setValidatorCompiler(validatorCompiler)
fastify.setSerializerCompiler(serializerCompiler)
fastify.setErrorHandler(errorMiddleware)

fastify.listen({ port: EnvVariables.PORT }, (err, address) => {
  if (err) {
    throw err
  }
  console.log(`Server is listening on ${address}`);

})