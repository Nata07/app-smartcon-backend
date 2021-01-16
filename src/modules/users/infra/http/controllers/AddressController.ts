import { Response, Request } from 'express';
import { container } from 'tsyringe';
import cep from 'cep-promise';
import CreateAddressService from '@modules/users/services/CreateAddressService';
import AddressRepository from '../../typeorm/repositories/AddressRepository';

export default class AddressController {
  public async index(
    request: Request,
    response: Response,
  ): Promise<Response | void> {
    const { postal_code } = request.params;

    cep(postal_code)
      .then(result => {
        const { city, street, neighborhood, state } = result;
        // eslint-disable-next-line no-unused-expressions
        return response.json({
          city,
          street_name: street,
          neighborhood,
          state,
        });
      })
      .catch(err => {
        return response.status(400).json({ error: err.message });
      });

    // return response.json({ message: 'ok' });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const addressRepository = new AddressRepository();

    const address = await addressRepository.findByUserId(user_id);

    return response.json(address);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      city,
      street_name,
      neighborhood,
      state,
      complement,
      number,
      postal_code,
    } = request.body;
    const user_id = request.user.id;
    const createAddress = container.resolve(CreateAddressService);

    const address = await createAddress.execute({
      user_id,
      city,
      street_name,
      neighborhood,
      state,
      complement,
      number,
      postal_code,
    });

    return response.json(address);
  }
}
