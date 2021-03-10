import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';
import { body } from 'express-validator';
import { Order, OrderDoc } from '../models/orderModel';
import { validateRequest } from '../common/middlewares/validate-request';
import { NotFoundError } from '../common/errors/not-found-error';
import { BadRequestError } from '../common/errors/bad-request-error';
import { NotAuthorizedError } from '../common/errors/not-authorized-error';
import { requireAuth } from '../common/middlewares/require-auth';
import { orderCancelledPublisher } from '../events/publishers/order-cancel-publisher';

const router = Router();

router.delete(
  '/api/orders',
  requireAuth,
  [body('orderId').not().isEmpty().withMessage('orderId must be provided')],
  validateRequest,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;

    const invalidId = !mongoose.Types.ObjectId.isValid(orderId);

    if (invalidId) {
      throw new BadRequestError('orderId are invalid');
    }

    const order = await Order.findById(orderId);

    if (!order) {
      throw new NotFoundError();
    }

    // User validation section
    if (order.userId !== req.currentUser.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === 'cancelled') {
      throw new BadRequestError('This order already Cancelled');
    }

    order.set({ status: 'cancelled' });
    await order.save();

    await orderCancelledPublisher(order);

    res.send(order);
  }
);

export { router as cancelOrderRouter };
