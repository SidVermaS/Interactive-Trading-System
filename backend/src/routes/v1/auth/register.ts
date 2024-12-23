import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import { AuthRegisterReqI, AuthRegisterReqSchema } from "../../../schemas/auth/auth";
import AuthModule from "../../../modules/auth/auth";

const authRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/v1/auth/register', {
    schema: { body: AuthRegisterReqSchema }
  }, async (request: FastifyRequest, reply: FastifyReply,) =>
     {
    await AuthModule.register(request.body as AuthRegisterReqI)
    return reply.status(HttpStatus.CREATED)
  })
}
export default authRoutes