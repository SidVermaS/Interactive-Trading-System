import prisma from "../../config/db";
import * as fs from 'fs'
const seedMeta = [
  {
    table: prisma.tradingPair,
    fileName: 'TradingPair.seed.json'
  }
]
const main = async () => {
  for (const seedMetaItem of seedMeta) {
    const data = JSON.parse(await fs.readFileSync(`src/prisma/data/${seedMetaItem.fileName}`, 'utf-8'))
    await seedMetaItem.table.createMany({ data })
  }
}
(async () => {
  try {
    await main()
  } catch (_error) {
    console.error(_error);
  } finally {
    await prisma.$disconnect()
  }
})()