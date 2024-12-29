import z from "zod";
import { NameRegexE } from "../../consts/common/regex";
import { UserTypesI } from "../../consts/user/user";

export const NameSchema = z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name must have be least than 50 characters').regex(NameRegexE, 'Name can only include letters, spaces, hyphens and apostrophes.')
export const PasswordSchema = z.string().min(8).max(32)
export const EmailSchema = z.string().email()
export const UserTypeSchema = z.enum(['CLIENT' as UserTypesI, 'ACCOUNT_MANAGER' as UserTypesI])

export const PaginationSchema = z.object({
  page: z.string().default('1').transform((data) => parseInt(data)).refine(data => data > 0, { message: 'page must be greater than 0' }),
  pageSize: z.string().default('10').transform((data)=>parseInt(data)).refine((data)=>data>0 && data<=25, {
    message: 'pageSize must be between 1 and 25'
  }),
}).transform(({ page, pageSize }) => ({
  page: (page - 1) * pageSize,
  pageSize: pageSize > 25 ? 10 : pageSize
}))
export type PaginationI = z.infer<typeof PaginationSchema>

export const RouteParamsSchema = z.object({
  id: z.string().uuid()
})
export type RouteParamsI = z.infer<typeof RouteParamsSchema>