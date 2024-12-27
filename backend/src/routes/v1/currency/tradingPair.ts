import type {
  FastifyRequest, FastifyInstance,
  FastifyPluginOptions,
  FastifyReply
} from "fastify"
import { HttpStatus } from "../../../consts/api/status"
import Currency from "../../../modules/currency";
import { PaginationSchema } from "../../../schemas/common/common";

const tradingPairRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.get('/v1/currency/trading-pair', {}, async (request: FastifyRequest, reply: FastifyReply,) => {
    const pagination = PaginationSchema.parse(request.query)
    const result = await Currency.TradingPairModule.fetch(undefined, pagination)
    reply.status(HttpStatus.OK).send(result)
  })
}
export default tradingPairRoutes