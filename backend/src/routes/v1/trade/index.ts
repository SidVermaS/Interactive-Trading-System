import { FastifyInstance } from "fastify";
import currentOrdersForClientRoutes from "./order/current/client";
import historicalOrdersForClientRoutes from "./order/history/client";

const tradeRoutes = (fastify: FastifyInstance): void => {
  fastify.register(currentOrdersForClientRoutes)
  fastify.register(historicalOrdersForClientRoutes)
}
export default tradeRoutes