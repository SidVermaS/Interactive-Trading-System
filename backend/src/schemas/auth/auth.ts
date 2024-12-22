import { z } from 'zod'
import { EmailSchema, NameSchema, PasswordSchema, UserTypeSchema } from '../common/common'

export const AuthRegisterReqSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  name: NameSchema,
  type: UserTypeSchema
})

export type AuthRegisterReqI = z.infer<typeof AuthRegisterReqSchema>

export const AuthLoginReqSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
  type: UserTypeSchema
})

export type AuthLoginReqI = z.infer<typeof AuthLoginReqSchema>