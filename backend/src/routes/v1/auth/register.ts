import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import { authRegisterSchema } from "../../../schemas/auth/auth";
// import { Auth } from "../../../modules/authentication/authentication"

const authRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {

  fastify.post('/v1/auth/register', { schema: { body: authRegisterSchema } }, async (request: FastifyRequest, reply: FastifyReply,) => {
    console.log('111 authRoutes',);
    return reply.status(HttpStatus.CREATED).send({ hello: 'world' })
  })
}

export default authRoutes