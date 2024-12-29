export const simulatePriceChange = (currentPrice: number, minChange: number = -0.02, maxChange: number = 0.02) => {
  const randomChange = (Math.random() * (maxChange - minChange)) + minChange;
  const newPrice = currentPrice * (1 + randomChange)
  return newPrice.toFixed(2)
}
