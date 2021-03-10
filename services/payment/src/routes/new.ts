import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { BadRequestError } from '../common/errors/bad-request-error';
import { NotFoundError } from '../common/errors/not-found-error';
import { NotAuthorizedError } from '../common/errors/not-authorized-error';
import { validateRequest } from '../common/middlewares/validate-request';
import { requireAuth } from '../common/middlewares/require-auth';
import { stripe } from '../stripe';
import { Order } from '../models/orderModel';
import { Payment } from '../models/paymentModel';
import { chargeCreatedPublisher } from '../events/publishers/charge-created-publisher';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    // user validation section
    if (order.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
    }
    if (order.status === 'cancelled') {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }
    if (order.status === 'succeeded') {
      throw new BadRequestError('Cannot pay for an succeeded order');
    }

    const charge = await stripe.charges.create({
      currency: 'usd',
      amount: order.totalPrice * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });
    await payment.save();

    chargeCreatedPublisher(payment);

    res.status(201).send({ id: payment._id });
  }
);

export { router as createChargeRouter };
