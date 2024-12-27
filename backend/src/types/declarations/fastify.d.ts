// // import type { FastifyRequest } from "fastify";
// import { UserReqI } from '../user/user'
// import "fastify"
// declare module 'fastify' {
//   // FastifyRequest to include user
//   interface FastifyRequest {
//     user?: UserReqI;
//   }
// }

// import type { FastifyRequest } from "fastify";
import "fastify"
declare module 'fastify' {
  // FastifyRequest to include user
  interface FastifyRequest {
    user?: { id: string, type: 'CLIENT' | 'ACCOUNT_MANAGER' };
  }
}