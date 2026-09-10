import { PaymentController } from '@/controllers/payment.controller';
import express from 'express';

const paymentRouter=express.Router();

const paymentController: PaymentController=new PaymentController();

paymentRouter.post('/order', paymentController.createOrder);

export default paymentRouter;