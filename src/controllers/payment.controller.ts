import instance from "@/config/razorpay.config";
import { InternalServerError } from "@/utils/errors/app.error";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export class PaymentController{

    createOrder=async (req: Request, resp: Response)=>{
        const options={
            amount: req.body.amount*100,
            currency: "INR",
            receipt: 'receipt-1103'
        };

        const order=await instance.orders.create(options);
        if(!order){
            throw new InternalServerError("Failed to Create Order");
        }

        return resp.status(StatusCodes.CREATED).json({
            success: true,
            message: 'Order created successfully',
            data: order
        })
    }

}