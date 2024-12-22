import type { FastifyRequest } from "fastify";
import { UserTypesI } from "../../consts/user/user";
declare module 'fastify' {
  // FastifyRequest to include user
  interface FastifyRequest extends FastifyRequest {
    user?: AuthTokenI;
  }
}