import { type Client, Prisma } from "@prisma/client"
import prisma from "../../config/db"
import { AppError } from "../../classes/appError"
import { hashPassword, verifyPassword } from "../../utils/auth/auth"
import { AuthLoginReqI } from "../../schemas/auth/auth"
import { AuthLoginResI } from "../../types/auth/auth"
import { generateToken } from "../../utils/auth/jwt"

const ClientModule = {
  findByEmail: async (email: string, select: Prisma.ClientSelect = { id: true }): Promise<Client | null> => await prisma.client.findFirst({ select, where: { email } }),
  register: async (params: Pick<Prisma.ClientCreateInput, 'name' | 'email' | 'password'>): Promise<Pick<Client, 'id'>> => {
    if (await ClientModule.findByEmail(params.email)) {
      throw new AppError('CLNT001')
    }
    const hashedPassword = await hashPassword(params.password)
    const client: Pick<Client, 'id'> | null = await prisma.client.create({
      select: { id: true }, data: {
        name: params.name,
        email: params.email,
        password: hashedPassword,
      }
    })
    if (!client) {
      throw new AppError('CLNT002')
    }
    return client
  },
  login: async (params: AuthLoginReqI): Promise<AuthLoginResI> => {
    if (!(await ClientModule.findByEmail(params.email))) {
      throw new AppError('CLNT001')
    }
    const client: Pick<Client, 'id' | 'name' | 'email' | 'password'> | null = await prisma.client.findFirst({ select: { id: true, name: true, email: true, password: true }, where: { email: params.email } })

    // If password doesn't matches then we'll throw an error
    if (!(client && await verifyPassword(params.password, client?.password))) {
      throw new AppError('AUTH001')
    }
    const token = generateToken({ id: client.id, type: 'CLIENT' })
    return { id: client.id, name: client.name, email: client.email, token } as AuthLoginResI
  }
}

export default ClientModule