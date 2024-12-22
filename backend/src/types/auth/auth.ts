import { Client } from "@prisma/client";
import type { UserTypesI } from "../../consts/user/user";

export type AuthTokenI = { id: string, type: UserTypesI }
export type AuthLoginResI = Pick<Client, 'id' | 'name' | 'email'> & {
  token: string;
}
