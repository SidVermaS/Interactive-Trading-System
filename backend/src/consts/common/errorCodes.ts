import { HttpStatus } from "../api/status";

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
  'GEN002': {
    status: HttpStatus.BAD_REQUEST,
    message: 'Invalid payload\'s data'
  },
  'GEN003': {
    status: HttpStatus.BAD_REQUEST,
    message: 'Syntatical error in the payload\'s data'
  },
  //#region Auth
  'AUTH001': {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Invalid username/password'
  },
  //#endregion Auth
  //#region Client
  'CLNT001': {
    status: HttpStatus.CONFLICT,
    message: 'Client already exists'
  },
  'CLNT002': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to create the Client'
  },
  'CLNT003': {
    status: HttpStatus.NOT_FOUND,
    message: 'Client not found'
  },
  'CLNT004': {
    status: HttpStatus.CONFLICT,
    message: 'Email id isn\'t registered'
  },
  'CLNT005': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to fetch the Clients'
  },
  //#endregion Client
  //#region AccountManager
  'ACMG001': {
    status: HttpStatus.CONFLICT,
    message: 'Account Manager already exists'
  },
  'ACMG002': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to create the AccountManager'
  },
  'ACMG00': {
    status: HttpStatus.NOT_FOUND,
    message: 'AccountManager not found'
  },
  //#endregion AccountManager
  //#region Order
  'ORD001': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to create the Order'
  },
  'ORD002': {
    status: HttpStatus.BAD_REQUEST,
    message: 'The payload for trading pair is invalid'
  },
  'ORD003': {
    status: HttpStatus.NOT_FOUND,
    message: 'Order not found'
  },
  'ORD004': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to fetch the Orders'
  },
  //#endregion Order
  //#region Currency
  'CUR001': {
    status: HttpStatus.NOT_FOUND,
    message: 'TradingPair not found'
  },
  'CUR002': {
    status: HttpStatus.NOT_FOUND,
    message: 'TradingPair not found'
  },
  'CUR003': {
    status: HttpStatus.UNPROCESSABLE_ENTITY,
    message: 'Failed to update the TradingPair'
  },
  //#endregion Currency
}

export type ErrorCodeI = keyof typeof ErrorCodes