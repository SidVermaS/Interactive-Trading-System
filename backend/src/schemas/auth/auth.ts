import { z } from 'zod'
// import { UserTypesI } from '../../consts/user/user'
export const authRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
  // type: z.enum(['CLIENT' as UserTypesI, 'ACCOUNT_MANAGER' as UserTypesI])
})