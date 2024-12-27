import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import { AuthRegisterReqSchema, type AuthRegisterReqI, } from "../../../schemas/auth/auth";
import AuthModule from "../../../modules/auth/auth";

const registerRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/v1/auth/register', {
    schema: { body: AuthRegisterReqSchema, }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {

    await AuthModule.register(request.body as AuthRegisterReqI)
    reply.status(HttpStatus.CREATED).send()
  })
}
export default registerRoutes