import { Order, Prisma } from "@prisma/client";
import prisma from "../../config/db";
import { AppError } from "../../classes/appError";

const OrdersModule = {
  createForClient: async (params: Pick<Prisma.OrderCreateInput, 'price' |
    'quantity' |
    'expiration' |
    'type' |
    'status' |
    'client' |
    'tradingPair'>): Promise<Order> => {
    const result = await prisma.order.create({ data: params, })
    if (!result?.id) {
      throw new AppError('ORD001')
    }
    return result;
  }
}
export default OrdersModule