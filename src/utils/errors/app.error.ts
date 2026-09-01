import { StatusCodes } from "http-status-codes";

// AppError class extends everything from Error (name,message) + extra
export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
    }
}

export class InternalServerError extends AppError{
    constructor(message: string){
        super(message, StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export class NotFoundError extends AppError{
    constructor(message: string){
        super(message, StatusCodes.NOT_FOUND);
    }
}

export class UnauthorizedAccess extends AppError{
    constructor(message: string){
        super(message, StatusCodes.UNAUTHORIZED);
    }
}