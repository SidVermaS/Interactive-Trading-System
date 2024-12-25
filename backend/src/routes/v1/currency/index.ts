import { FastifyInstance } from "fastify";
import tradingPairRoutes from "./tradingPair";

const currencyRoutes = async (fastify: FastifyInstance): Promise<void> => {
  await fastify.register(tradingPairRoutes)
}
export default currencyRoutes