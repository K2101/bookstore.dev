import { Request, Response, Router } from 'express';
import { requireAuth } from '../common/middlewares/require-auth';
import { createAndUpdateCustomerInfo } from '../models/customerModels';
import { NotFoundError } from '../common/errors/not-found-error';

const router = Router();

// This Route handle get, create, update customer info all in one route
// powered by Cassandra upsert
router.post(
  '/api/customers',
  requireAuth,
  async (req: Request, res: Response) => {
    const { address, city, country, postalCode } = req.body;
    const { id } = req.currentUser!;

    const customer = await createAndUpdateCustomerInfo(
      id,
      address,
      city,
      country,
      postalCode
    );

    if (!customer.id) {
      throw new NotFoundError();
    }

    res.send(customer);
  }
);

export { router as createAndUpdateCustomerInfoRoute };
