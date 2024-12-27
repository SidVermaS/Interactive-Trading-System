import type { FastifyInstance } from "fastify"
import { authMiddleware } from "../middlewares/authMiddleware"
import currencyRoutes from "./v1/currency"
import tradeRoutes from "./v1/trade"

const secureRoutes = (fastify: FastifyInstance): void => {
  fastify.addHook('preHandler', authMiddleware)
  fastify.register(currencyRoutes)
  fastify.register(tradeRoutes)
}
export default secureRoutes