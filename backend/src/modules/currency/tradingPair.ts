import { Prisma, TradingPair } from "@prisma/client";
import { PaginationI } from "../../schemas/common/common";
import prisma from "../../config/db";
import { PAGINATION } from "../../consts/common/pagination";

export const TradingPairModule = {
  fetch: async (filters?: Prisma.TradingPairWhereInput, pagination: PaginationI = PAGINATION, orderBy: Prisma.TradingPairOrderByWithRelationInput = { symbol: 'asc' }, select: Prisma.TradingPairSelect = { id: true, symbol: true, baseAsset: true, baseAssetPrecision: true, quoteAsset: true, quotePrecision: true, }):Promise<TradingPair[]> => {
    const result = await prisma.tradingPair.findMany({
      where: filters, orderBy, select,
      skip: pagination.page,
      take: pagination.limit
    })
    return result;
  }
}