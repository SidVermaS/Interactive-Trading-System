import { FastifyInstance } from "fastify";
import orderForClientRoutes from "./order/client";

const tradeRoutes = (fastify: FastifyInstance): void => {
  fastify.register(orderForClientRoutes)
}
export default tradeRoutes