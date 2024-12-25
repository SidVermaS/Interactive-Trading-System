import type { FastifyInstance } from "fastify"
import authRoutes from "./v1/auth"

const unsecureRoutes = (fastify: FastifyInstance) => {
  fastify.register(authRoutes)
}
export default unsecureRoutes