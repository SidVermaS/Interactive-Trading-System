import { FastifyInstance } from "fastify";
import authRoutes from "./v1/auth/register";
import { authMiddleware } from "../middlewares/authHandler";

const routes = (fastify: FastifyInstance) => {
  fastify.register(authRoutes)
  // console.log('111 routes',);
  fastify.addHook('preHandler', authMiddleware)

}
export default routes