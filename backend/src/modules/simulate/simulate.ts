import { TradingPair } from "@prisma/client"
import { TradingPairModule } from "../currency/tradingPair"
import { simulatePriceChange } from "../../utils/simulate/simulate"
import ClientModule from "../user/client"

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
    const clientsResult = await ClientModule.fetch()
    const clientsCount = clientsResult.length;

    const tradingPairResult = await TradingPairModule.fetchById({ symbol: 'BTCUSDT' })

    for (let index = 0; index < Math.floor(noOfOrders / 2); index++) {

    }

  }
}
export default SimulateModule