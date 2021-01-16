import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AddressController from '../controllers/AddressController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const cepRouter = Router();
const addressController = new AddressController();

cepRouter.use(ensureAuthenticated);
// cepRouter.get('/', addressController.show);

cepRouter.get(
  '/:postal_code',
  celebrate({
    [Segments.PARAMS]: {
      postal_code: Joi.string().required(),
    },
  }),
  addressController.index,
);

export default cepRouter;
