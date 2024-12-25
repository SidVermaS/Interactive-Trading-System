import type { FastifyRequest } from "fastify";
import { UserReqI } from "../user/user";

export type FastifyRequestReqI = FastifyRequest & {
  user?: UserReqI;
}