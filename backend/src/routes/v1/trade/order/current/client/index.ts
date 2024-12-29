import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { HttpStatus } from "../../../../../../consts/api/status"
import Trade from "../../../../../../modules/trade"
import { OrderCreateForClientI, OrderCreateForClientSchema, OrderUpdateForClientSchema } from "../../../../../../schemas/trade/order"
import { PaginationSchema, RouteParamsI, RouteParamsSchema } from "../../../../../../schemas/common/common"
import { FastifyRequestReqI } from "../../../../../../types/common/declarations"

const currentOrdersForClientRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.get('/v1/trade/order/current/client', {
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const pagination = PaginationSchema.parse(request.query)
    const result = await Trade.OrderModule.fetch({
      status: {
        in: ['PENDING',]
      }
    }, pagination)
    reply.status(HttpStatus.OK).send(result)
  })
  fastify.get('/v1/trade/order/current/client/:id', {
    schema: {
      params: RouteParamsSchema,
    }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.updateForClient(request.body as OrderCreateForClientI, { id: (request.params as RouteParamsI).id })
    reply.status(HttpStatus.OK).send(result)
  })
  fastify.post('/v1/trade/order/current/client', {
    schema: {
      body: OrderCreateForClientSchema
    }
  }, async (request: FastifyRequestReqI, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.createForClient({ ...request.body as OrderCreateForClientI, clientId: request!.user!.id!, })
    reply.status(HttpStatus.OK).send(result)
  })
  fastify.patch('/v1/trade/order/current/client/:id', {
    schema: {
      params: RouteParamsSchema,
      body: OrderUpdateForClientSchema
    }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.updateForClient(request.body as OrderCreateForClientI, { id: (request.params as RouteParamsI).id })
    reply.status(HttpStatus.OK).send(result)
  })
}

export default currentOrdersForClientRoutes