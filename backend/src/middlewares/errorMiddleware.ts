import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../classes/appError";
import z from "zod";

export const errorMiddleware = (error: Error, request: FastifyRequest, reply: FastifyReply) => {
  let appError: AppError;
  console.log('111 error');
  console.log( error.name);

  if (error instanceof AppError) {
    appError = error as AppError
  } else if (error instanceof z.ZodError) {
    appError = new AppError('GEN002', { error: error.errors })
  } else {
    appError = new AppError('GEN001')
  }
  return reply.status(appError.status).send(appError.json)
}