import { UserI } from "../user/user";

export type AuthenticationRegisterParamsI = {
  email: string;
  password: string;
  type: UserI
}