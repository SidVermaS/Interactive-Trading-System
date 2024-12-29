import { Prisma, TradingPair } from "@prisma/client";
import { PaginationI } from "../../schemas/common/common";
import prisma from "../../config/db";
import { PAGINATION } from "../../consts/common/pagination";
import { AppError } from "../../classes/appError";
import { PrismaErrorCodes } from "../../consts/common/prismaErrorCodes";

export const TradingPairModule = {
  fetch: async (filters?: Prisma.TradingPairWhereInput, pagination: PaginationI = PAGINATION, orderBy: Prisma.TradingPairOrderByWithRelationInput = { symbol: 'asc' }, select: Prisma.TradingPairSelect = { id: true, symbol: true, baseAsset: true, baseAssetPrecision: true, quoteAsset: true, quoteAssetPrecision: true, }): Promise<TradingPair[]> => {
    const result = await prisma.tradingPair.findMany({
      where: filters, orderBy, select,
      skip: pagination.page,
      take: pagination.pageSize
    })
    return result;
  },
  fetchById: async (filters?: Prisma.TradingPairWhereInput, select: Prisma.TradingPairSelect = { id: true, symbol: true, baseAsset: true, baseAssetPrecision: true, quoteAsset: true, quoteAssetPrecision: true, }): Promise<TradingPair> => {
    const result = await prisma.tradingPair.findFirst({
      where: filters, select,
    })
    if (!result) {
      throw new AppError('CUR001')
    }
    return result;
  },
  update: async (params: Pick<Prisma.TradingPairUncheckedCreateInput, 'price'>, filters: Pick<Prisma.TradingPairWhereUniqueInput, "id">): Promise<TradingPair> => {
    try {
      const result = await prisma.tradingPair.update({ data: params, where: { id: filters.id } })

      if (!result?.id) {
        throw new AppError('CUR003')
      }
      return result;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === PrismaErrorCodes.RECORD_TO_UPDATE_NOT_FOUND) {
          throw new AppError('CUR002')
        }
      }
      throw error
    }
  },
}