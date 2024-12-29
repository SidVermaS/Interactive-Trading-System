export const castToAny = (data: unknown) => JSON.parse(JSON.stringify(data))
export const randomFloat = (min: number, max: number, decimals: number = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}