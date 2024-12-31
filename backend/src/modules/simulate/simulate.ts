import { Prisma, TradingPair } from "@prisma/client"
import { TradingPairModule } from "../currency/tradingPair"
import { simulatePriceChange } from "../../utils/simulate/simulate"
import ClientModule from "../user/client"
import { randomFloat, randomInt } from "../../utils/common/data"

const SimulateModule = {
  priceChange: async (tradingPair: TradingPair) => await TradingPairModule.update({
    price: simulatePriceChange(tradingPair!.price!.toNumber()),
  }, { id: tradingPair.id }),
  priceChangeBulk: async () => {
    const tradingPairResult: TradingPair[] = await TradingPairModule.fetch(undefined, {
      page: 1, pageSize: 10
    })
    await Promise.allSettled(tradingPairResult.map((tradingPair) => SimulateModule.priceChange(tradingPair)))
  },
  createOrders: async (noOfOrders: number = 10) => {
    const [clientsResult, tradingPairResult] = await Promise.all([ClientModule.fetch(undefined, undefined, undefined, { id: true }), TradingPairModule.fetchById({ symbol: 'BTCUSDT' })])

    const tradingPairId = tradingPairResult.id
    const clientsCount = clientsResult.length;
    const simulatedOrders: Prisma.OrderUncheckedCreateInput[] = []
    for (let index = 0; index < Math.floor(noOfOrders / 2); index++) {
      const buyClientId = clientsResult[randomInt(0, clientsCount)].id
      const sellClientId = clientsResult[randomInt(0, clientsCount)].id
      // 5 minutes, 2 hours
      const expiration = new Date(new Date().getTime() + (randomInt(300000, 7200000)))
      const price = randomFloat(tradingPairResult.minPrice.toNumber(), tradingPairResult.maxPrice.toNumber())
      const quantity = randomFloat(tradingPairResult.minQty.toNumber(), tradingPairResult.maxQty.toNumber())
      const buyOrder: Prisma.OrderUncheckedCreateInput = {
        clientId: buyClientId,
        expiration,
        type: 'BUY',
        price,
        quantity,
        tradingPairId
      }
      const sellOrder: Prisma.OrderUncheckedCreateInput = {
        clientId: sellClientId,
        expiration,
        type: 'SELL',
        price,
        quantity, tradingPairId
      }
      simulatedOrders.push(buyOrder, sellOrder)
    }

  }
}
export default SimulateModule