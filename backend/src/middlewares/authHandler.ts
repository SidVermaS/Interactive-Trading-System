import type { FastifyReply, FastifyRequest } from "fastify";
import { HttpStatus } from "../consts/api/status";
import { verifyToken } from "../utils/auth/jwt";
import { AuthTokenI } from "../types/auth/auth";

export const authMiddleware = (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader: string | undefined = request.headers.authorization
  if (!authHeader) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({ message: 'Unauthorized' })
  }
  try {
    const token: string = authHeader.split(' ')[1]
    const decoded: AuthTokenI | null = verifyToken(token)
    if (decoded) {
      request.user = decoded
    }
  } catch (_error) {
    return reply.status(HttpStatus.UNAUTHORIZED).send({ message: 'Unauthorized' })

  }
}