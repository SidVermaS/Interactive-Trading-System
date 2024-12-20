import { HttpStatus } from "./status";

export type ErrorCodeValueI = {
  status: HttpStatus
  message: string
}
export type ErrorCodeDataI = {
  [key: string]: ErrorCodeValueI
}

export const ErrorCodes: ErrorCodeDataI = {
  'GEN001': {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Something went wrong! Please try after sometime'
  },
  'AUTH001': {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Invalid username/password'
  }
}

export type ErrorCodeI = keyof typeof ErrorCodes