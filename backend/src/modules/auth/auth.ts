import { AuthLoginReqI, AuthRegisterReqI } from "../../schemas/auth/auth";
import ClientModule from "../user/client";
import AccountManagerModule from "../user/accountManager";
import { AuthLoginResI } from "../../types/auth/auth";
import { AccountManager, Client } from "@prisma/client";

const AuthModule = {
  register: async (params: AuthRegisterReqI): Promise<Pick<Client, "id"> | Pick<AccountManager, "id">> => await (params.type === 'CLIENT' ? ClientModule.register(params) : AccountManagerModule.register(params)),
  login: async (params: AuthLoginReqI): Promise<AuthLoginResI> => await (params.type === 'CLIENT' ? ClientModule.login(params) : AccountManagerModule.login(params))
}
export default AuthModule