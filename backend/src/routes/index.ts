import { FastifyInstance } from "fastify";
import authRoutes from "./v1/auth";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = (fastify: FastifyInstance) => {
  fastify.register(authRoutes)
  // console.log('111 routes',);
  fastify.addHook('preHandler', authMiddleware)

}
export default routes