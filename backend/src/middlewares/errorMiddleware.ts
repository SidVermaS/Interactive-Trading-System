import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../classes/appError";
import z from "zod";

export const errorMiddleware = (error: any, _request: FastifyRequest, reply: FastifyReply) => {
  let appError: AppError;
  console.log('111 error', error instanceof z.ZodError, error instanceof AppError);
  console.log(JSON.stringify(error?.validation));

  if (error instanceof AppError) {
    appError = error as AppError
  }
  // For ZodError
  else if (error?.validation) {
    appError = new AppError('GEN002', { error: error.errors })
  } else {
    appError = new AppError('GEN001')
  }
  return reply.status(appError.status).send(appError.json)
}