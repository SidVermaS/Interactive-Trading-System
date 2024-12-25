import { ErrorCodeI, ErrorCodes, ErrorCodeValueI } from "../consts/api/errorCodes";
import { HttpStatus } from "../consts/api/status";
import { AppErrorJSONI } from "../types/api/appError";
import { StringUnknownI } from "../types/common/data";

export class AppError {
  private _status: HttpStatus;
  private _errorCode: ErrorCodeI;
  private _message: string;
  private _data?: StringUnknownI;

  constructor(_errorCode: ErrorCodeI, _data?: StringUnknownI) {
    this._errorCode = _errorCode;
    const ErrorCodeValue: ErrorCodeValueI = ErrorCodes[_errorCode]
    this._status = ErrorCodeValue.status;
    this._message = ErrorCodeValue.message;
    this._data = _data
  }
  // errorCode for the response
  get errorCode(): ErrorCodeI {
    return this._errorCode
  }
  // status for the response
  get status(): HttpStatus {
    return this._status
  }
  get message(): string {
    return this._message
  }
  get data(): StringUnknownI | undefined {
    return this._data
  }
  // json for the response
  get json(): AppErrorJSONI {
    return {
      code: this._errorCode,
      message: this.message,
      ...({ ...this._data })
    }
  }

}