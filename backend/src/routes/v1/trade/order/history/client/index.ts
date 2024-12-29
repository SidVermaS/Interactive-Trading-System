import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { HttpStatus } from "../../../../../../consts/api/status"
import Trade from "../../../../../../modules/trade"
import { OrderCreateForClientI, OrderUpdateForClientSchema } from "../../../../../../schemas/trade/order"
import { PaginationSchema, RouteParamsI, RouteParamsSchema } from "../../../../../../schemas/common/common"

const historicalOrdersForClientRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.get('/v1/trade/order/history/client', {
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const pagination = PaginationSchema.parse(request.query)
    const result = await Trade.OrderModule.fetch({
      status: {
        in: ['COMPLETED', 'CANCELED', 'EXPIRED', 'REJECTED']
      }
    }, pagination)
    reply.status(HttpStatus.OK).send(result)
  })
  fastify.get('/v1/trade/order/history/client/:id', {
    schema: {
      params: RouteParamsSchema,
    }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.updateForClient(request.body as OrderCreateForClientI, { id: (request.params as RouteParamsI).id })
    reply.status(HttpStatus.OK).send(result)
  })

  fastify.patch('/v1/trade/order/history/client/:id', {
    schema: {
      params: RouteParamsSchema,
      body: OrderUpdateForClientSchema
    }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.updateForClient(request.body as OrderCreateForClientI, { id: (request.params as RouteParamsI).id })
    reply.status(HttpStatus.OK).send(result)
  })
}

export default historicalOrdersForClientRoutes