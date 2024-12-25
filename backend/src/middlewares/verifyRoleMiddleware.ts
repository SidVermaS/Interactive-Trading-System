import { FastifyReply, } from "fastify";
import { HttpStatus } from "../consts/api/status";
import { verifyToken } from "../utils/auth/jwt";
import { AuthTokenI } from "../types/auth/auth";
import { FastifyRequestReqI } from "../types/common/declarations";

export const verifyRoleMiddleware = (request: FastifyRequestReqI, reply: FastifyReply) => {

}