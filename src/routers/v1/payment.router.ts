import { PaymentController } from '@/controllers/payment.controller';
import { JWTAuth } from '@/middlewares/auth.middleware';
import express from 'express';

const paymentRouter=express.Router();

const paymentController: PaymentController=new PaymentController();

paymentRouter.post('/order', JWTAuth.validateToken,paymentController.createOrder);

export default paymentRouter;