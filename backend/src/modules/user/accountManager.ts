import { type AccountManager, Prisma } from "@prisma/client"
import prisma from "../../config/db"
import { AppError } from "../../classes/appError"
import { hashPassword, verifyPassword } from "../../utils/auth/auth"
import { generateToken } from "../../utils/auth/jwt"
import { AuthLoginResI } from "../../types/auth/auth"
import { AuthLoginReqI } from "../../schemas/auth/auth"

const AccountManagerModule = {
  findByEmail: async (email: string, select: Prisma.AccountManagerSelect = { id: true }): Promise<AccountManager | null> => await prisma.accountManager.findFirst({ select, where: { email } }),
  register: async (params: Pick<Prisma.ClientCreateInput, 'name' | 'email' | 'password'>): Promise<Pick<AccountManager, 'id'>> => {
    if (await AccountManagerModule.findByEmail(params.email)) {
      throw new AppError('ACMG001')
    }
    const hashedPassword = await hashPassword(params.password)
    const accountManager: Pick<AccountManager, 'id'> | null = await prisma.accountManager.create({
      select: { id: true }, data: {
        name: params.name,
        email: params.email,
        password: hashedPassword,
      }
    })
    if (!accountManager) {
      throw new AppError('ACMG002')
    }
    return accountManager
  },
  login: async (params: AuthLoginReqI): Promise<AuthLoginResI> => {
    if (!(await AccountManagerModule.findByEmail(params.email))) {
      throw new AppError('CLNT001')
    }
    const accountManager: Pick<AccountManager, 'id' | 'name' | 'email' | 'password'> | null = await prisma.accountManager.findFirst({ select: { id: true, name: true, email: true, password: true }, where: { email: params.email } })

    // If password doesn't matches then we'll throw an error
    if (!(accountManager && await verifyPassword(params.password, accountManager?.password))) {
      throw new AppError('AUTH001')
    }
    const token = generateToken({ id: accountManager.id, type: 'ACCOUNT_MANAGER' })
    return { id: accountManager.id, name: accountManager.name, email: accountManager.email, token } as AuthLoginResI
  }
}

export default AccountManagerModule