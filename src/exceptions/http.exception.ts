import { StatusCodes } from "http-status-codes";

export default class HttpException extends Error {
  public message: string;
  public code: number;

  constructor(message: string, code: number = StatusCodes.BAD_REQUEST) {
    super(message);
    this.message = message;
    this.code = code;
  }
}
