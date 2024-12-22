import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import { AuthRegisterReqI, AuthRegisterReqSchema } from "../../../schemas/auth/auth";
import AuthModule from "../../../modules/auth/auth";
import { AuthLoginResI } from "../../../types/auth/auth";

const authRoutes = async (fastify: FastifyInstance, options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/v1/auth/login', {
    schema: { body: AuthRegisterReqSchema }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const res: AuthLoginResI = await AuthModule.login(request.body as AuthRegisterReqI)
    return reply.status(HttpStatus.OK).send(res)
  })
}
export default authRoutes