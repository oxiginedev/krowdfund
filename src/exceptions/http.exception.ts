import { StatusCodes } from "http-status-codes";

export class HttpException extends Error {
  constructor(
    public readonly message: string,
    public readonly code: number = StatusCodes.BAD_REQUEST
  ) {
    super(message);
  }
}

export class AuthenticationException extends HttpException {
  constructor(message = "Unauthenticated") {
    super(message, StatusCodes.UNAUTHORIZED);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message = "You are unauthorized to access this resource") {
    super(message, StatusCodes.FORBIDDEN);
  }
}
