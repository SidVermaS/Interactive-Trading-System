import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import { AuthLoginReqSchema, type AuthRegisterReqI, } from "../../../schemas/auth/auth";
import type { AuthLoginResI } from "../../../types/auth/auth";
import AuthModule from "../../../modules/auth/auth";
const loginRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/v1/auth/login', {
    schema: { body: AuthLoginReqSchema }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const res: AuthLoginResI = await AuthModule.login(request.body as AuthRegisterReqI)
    return reply.status(HttpStatus.OK).send(res)
  })
}
export default loginRoutes