import type { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify"
import { HttpStatus } from "../../../../../consts/api/status"
import Trade from "../../../../../modules/trade"
import { OrderCreateForClientI, OrderCreateForClientSchema, OrderUpdateForClientSchema } from "../../../../../schemas/trade/order"
import { RouteParamsI, RouteParamsSchema } from "../../../../../schemas/common/common"
import { FastifyRequestReqI } from "../../../../../types/common/declarations"

const orderForClientRoutes = async (fastify: FastifyInstance, _options: FastifyPluginOptions): Promise<void> => {
  fastify.post('/v1/trade/order/client', {
    schema: {
      body: OrderCreateForClientSchema
    }
  }, async (request: FastifyRequestReqI, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.createForClient({ ...request.body as OrderCreateForClientI, clientId: request!.user!.id!, })
    reply.status(HttpStatus.OK).send(result)
  })
  fastify.patch('/v1/trade/order/client/:id', {
    schema: {
      params: RouteParamsSchema,
      body: OrderUpdateForClientSchema
    }
  }, async (request: FastifyRequest, reply: FastifyReply,) => {
    const result = await Trade.OrderModule.updateForClient(request.body as OrderCreateForClientI, { id: (request.params as RouteParamsI).id })
    reply.status(HttpStatus.OK).send(result)
  })
}

export default orderForClientRoutes