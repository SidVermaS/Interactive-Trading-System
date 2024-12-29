import { Order, Prisma, } from "@prisma/client";
import prisma from "../../config/db";
import { AppError } from "../../classes/appError";
import { z } from "zod";
import { TradingPairModule } from "../currency/tradingPair";
import { validationError } from "../../utils/common/error";
import { PrismaErrorCodes } from "../../consts/common/prismaErrorCodes";
import { PaginationI } from "../../schemas/common/common";
import { PAGINATION } from "../../consts/common/pagination";
// import { PAGINATION } from "../../consts/common/pagination";
// import type { PaginationI } from "../../schemas/common/common";
const OrderModule = {
  fetch: async (filters?: Prisma.OrderWhereInput, pagination: PaginationI = PAGINATION, orderBy: Prisma.OrderOrderByWithRelationInput = { createdAt: 'asc' }, select: Prisma.OrderSelect = {
    id: true, price: true, expiration: true, quantity: true, type: true, status: true, createdAt: true,
    tradingPair: {
      select: {
        symbol: true,
      }
    }
  }) => {
    const result = await prisma.order.findMany({
      where: filters,
      select
    })
    if (!result) {
      throw new AppError('ORD004')
    }
    return result;
  },
  createForClient: async (params: Pick<Prisma.OrderUncheckedCreateInput, 'price' | 'quantity' | 'expiration' | 'type' | 'tradingPairId' | 'clientId'>): Promise<Order> => {
    await OrderModule.validatePriceQty(params)
    const result = await prisma.order.create({ data: params, })
    if (!result?.id) {
      throw new AppError('ORD001')
    }
    return result;
  },
  updateForClient: async (params: Pick<Prisma.OrderUncheckedCreateInput, 'price' | 'quantity' | 'expiration'>, filters: Pick<Prisma.OrderWhereUniqueInput, 'id'>): Promise<Order> => {
    try {
      await OrderModule.validatePriceQty(params)
      const result = await prisma.order.update({ data: params, where: filters })

      if (!result?.id) {
        throw new AppError('ORD001')
      }
      return result;

    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCodes.RECORD_TO_UPDATE_NOT_FOUND) {
          throw new AppError('ORD003')
        }
      }
      throw error
    }
  },
  validatePriceQty: async (params: Pick<Prisma.OrderWhereInput, 'tradingPairId' | 'price' | 'quantity' | 'expiration'>): Promise<void> => {
    const tradingPairResult = await TradingPairModule.fetchById({ id: params.tradingPairId?.toString() }, {
      minPrice: true,
      maxPrice: true,
      minQty: true,
      maxQty: true,
    })
    const ValidatePriceQtySchema = z.object({
      price: z.number().min(tradingPairResult.minPrice.toNumber()).max(tradingPairResult.maxPrice.toNumber()),
      quantity: z.number().min(tradingPairResult.minQty.toNumber()).max(tradingPairResult.maxQty.toNumber()),
      expiration: z.string().datetime().refine((data) => new Date(data).getTime() > Date.now(), 'Date & time must be in the future'),
    })
    const { error } = ValidatePriceQtySchema.safeParse(params)
    if (error) {
      throw new AppError('ORD002', validationError(error))
    }
    return;
  }
}
export default OrderModule