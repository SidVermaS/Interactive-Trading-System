import type { FastifyInstance } from "fastify"
// import { authMiddleware } from "../middlewares/authMiddleware"
import currencyRoutes from "./v1/currency"

const secureRoutes = (fastify: FastifyInstance) => {
  fastify.register(currencyRoutes)
  // fastify.addHook('preHandler', authMiddleware)
}
export default secureRoutes