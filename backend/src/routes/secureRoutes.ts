import type { FastifyInstance } from "fastify"
import { authMiddleware } from "../middlewares/authMiddleware"

const secureRoutes = (fastify: FastifyInstance) => {
  fastify.addHook('preHandler', authMiddleware)
  // fastify.register(authRoutes)
}
export default secureRoutes