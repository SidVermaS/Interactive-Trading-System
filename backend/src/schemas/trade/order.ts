import { OrderType, } from "@prisma/client";
import z from "zod";

export const OrderCreateForClientSchema = z.object({
  price: z.number(),
  quantity: z.number().int(),
  expiration: z.string().datetime().refine((data) => new Date(data).getTime() > Date.now(), 'Date & time must be in the future'),
  type: z.nativeEnum(OrderType),
  tradingPairId: z.string().uuid(),
})
export type OrderCreateForClientI = z.infer<typeof OrderCreateForClientSchema>

export const OrderUpdateForClientSchema = z.object({
  price: z.number(),
  quantity: z.number().int(),
  expiration: z.string().datetime().refine((data) => new Date(data).getTime() > Date.now(), 'Date & time must be in the future'),
})
export type OrderUpdateForClientI = z.infer<typeof OrderUpdateForClientSchema>


export const OrderUpdateParamsForClientSchema = z.object({
  id: z.string().uuid(),
})
export type OrderUpdateParamsForClientI = z.infer<typeof OrderUpdateParamsForClientSchema>