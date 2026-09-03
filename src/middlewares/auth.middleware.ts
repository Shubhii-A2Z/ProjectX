import { JWTToken } from "@/utils/common/auth.util";
import { UnauthorizedAccess } from "@/utils/errors/app.error";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class JWTAuth {

    static validateToken(req: Request, resp: Response, next: NextFunction){
        // Extracting the jwt token from request headers
        const token=req.headers.authorization?.split(' ')[1]; // Token will be of the form: Bearer <token>


        if(!token){
            return resp.status(StatusCodes.FORBIDDEN).json({
                message: "Token not found",
                error: new UnauthorizedAccess("Token not found")
            });
        }

        try {
            // verifying jwt token
            const decodedPayload=JWTToken.verifyToken(token);
            
            // attaching the decoded payload to the request
            (req as any).user=decodedPayload;
            
            next();
        } catch (error) {
            return resp.status(StatusCodes.UNAUTHORIZED).json({
                success: false,
                message: "Invalid JWT Token",
                err: new UnauthorizedAccess('Invalid JWT Token'),
            });
        }
    }

}