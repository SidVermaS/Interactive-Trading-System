import type { FastifyError, FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../classes/appError";

export const errorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  let appError: AppError;
  if (error instanceof AppError) {
    appError = error as AppError
  } else {
    appError = new AppError('GEN001')
  }
  return reply.status(appError.status).send(appError.json)
}