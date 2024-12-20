import { FastifyInstance } from "fastify";
import authRoutes from "./v1/auth/register";

const routes = (fastify: FastifyInstance) => {
  console.log('111 routes',);

  fastify.register(authRoutes)
}
export default routes