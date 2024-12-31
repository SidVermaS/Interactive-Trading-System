export const castToAny = (data: unknown) => JSON.parse(JSON.stringify(data))
export const randomFloat = (min: number, max: number, decimals: number = 2) => {
  const factor = Math.pow(10, decimals)
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}
export const randomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min+1)) + min
}