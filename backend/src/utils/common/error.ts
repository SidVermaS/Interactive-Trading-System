import { StringUnknownI } from "../../types/common/data";
import { castToAny } from "./data";

export const validationError = (_error: unknown) => {
  const errorObj = castToAny(_error)  

  const error = (errorObj?.issues?.length ? errorObj?.issues : errorObj?.validation?.length ? errorObj?.validation : []).map((item: StringUnknownI) => (item))
  return { error };
}