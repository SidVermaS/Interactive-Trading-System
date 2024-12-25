import { FastifyInstance } from "fastify";
import unsecureRoutes from "./unsecureRoutes";
import secureRoutes from "./secureRoutes";
const routes = (fastify: FastifyInstance) => {
  fastify.register(unsecureRoutes)
  fastify.register(secureRoutes)
}
export default routes