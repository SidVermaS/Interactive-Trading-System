import type { FastifyReply, FastifyRequest } from "fastify";
import { AppError } from "../classes/appError";
import { castToAny } from "../utils/common/data";

export const errorMiddleware = (_error: unknown, _request: FastifyRequest, reply: FastifyReply) => {

  let appError: AppError;
  if (_error instanceof AppError) {
    appError = _error as AppError
  }
  // For ZodError
  else if (castToAny(_error)?.validation) {
    const error = castToAny(_error)
    const validation = error.validation.map((item: { params: { issue: { path: string[]; message: string; expected: string; }; }; }) => ({ attribute: item.params.issue.path[0], message: item.params.issue.message, expected: item.params.issue.expected, }))

    appError = new AppError('GEN002', { error: validation })
  } else {
    appError = new AppError('GEN001')
  }
  return reply.status(appError.status).send(appError.json)
}