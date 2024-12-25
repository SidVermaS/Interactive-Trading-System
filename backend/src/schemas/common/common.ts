import z from "zod";
import { NameRegexE } from "../../consts/common/regex";
import { UserTypesI } from "../../consts/user/user";

export const NameSchema = z.string().min(2, 'Name must have at least 2 characters').max(50, 'Name must have be least than 50 characters').regex(NameRegexE, 'Name can only include letters, spaces, hyphens and apostrophes.')
export const PasswordSchema = z.string().min(8).max(32)
export const EmailSchema = z.string().email()
export const UserTypeSchema = z.enum(['CLIENT' as UserTypesI, 'ACCOUNT_MANAGER' as UserTypesI])

export const PaginationSchema = z.object({
  page: z.number().min(1).optional().default(1),
  pageSize: z.number().min(1).optional().default(10)
}).transform(({ page, pageSize }) => ({
  page: (page - 1) * pageSize,
  pageSize: pageSize > 25 ? 10 : pageSize
}))
export type PaginationI = z.infer<typeof PaginationSchema>