import { UserService } from "@/services/user.service.interface";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class UserController{
    private readonly userService: UserService;

    constructor(userService: UserService){
        this.userService=userService;
    }

    createUser=async (req: Request, resp: Response) => {
        const response=await this.userService.create(req.body);

        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: "User Created Successfully",
            data: response
        });
    }

    signinUser=async (req: Request, resp: Response) => {
        const response=await this.userService.getByEmail(req.body);

        return resp.status(StatusCodes.OK).json({
            success: true,
            message: "User Signed In Successfully",
            data: response
        });
    }


}