import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import AddressController from '../controllers/AddressController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const addressRoute = Router();
const addressController = new AddressController();

addressRoute.use(ensureAuthenticated);

addressRoute.get('/', addressController.show);

addressRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      city: Joi.string().required(),
      street_name: Joi.string().required(),
      neighborhood: Joi.string().required(),
      state: Joi.string().required(),
      complement: Joi.string(),
      number: Joi.string(),
      postal_code: Joi.string(),
    },
  }),
  addressController.create,
);

export default addressRoute;
