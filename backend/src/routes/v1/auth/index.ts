import { FastifyInstance } from "fastify";
import registerRoutes from "./register";
import loginRoutes from "./login";

const authRoutes = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(loginRoutes)
  await fastify.register(registerRoutes)
}
export default authRoutes