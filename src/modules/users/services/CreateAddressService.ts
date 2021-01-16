// import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICreateAddressDTO from '../dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';
import IAddressRepository from '../repositories/IAddressRepository';

@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressRepository')
    private addressRepository: IAddressRepository,
  ) {}

  public async execute({
    user_id,
    city,
    street_name,
    neighborhood,
    state,
    complement,
    number,
    postal_code,
  }: ICreateAddressDTO): Promise<Address> {
    let address = await this.addressRepository.findByUserId(user_id);

    if (!address) {
      address = await this.addressRepository.create({
        user_id,
        city,
        street_name,
        neighborhood,
        state,
        complement,
        number,
        postal_code,
      });
    } else {
      address.city = city;
      address.street_name = street_name;
      address.neighborhood = neighborhood;
      address.state = state;
      address.complement = complement;
      address.number = number === undefined ? '0' : number;
      address.postal_code = postal_code;

      await this.addressRepository.save(address);
    }

    return address;
  }
}

export default CreateAddressService;
