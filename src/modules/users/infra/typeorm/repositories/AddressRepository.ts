import { Repository, getRepository } from 'typeorm';
import ICreateAddressDTO from '@modules/users/dtos/ICreateAddressDTO';
import IAddressRepository from '@modules/users/repositories/IAddressRepository';
import Address from '../entities/Address';

class AddressRepository implements IAddressRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }

  public async findByUserId(user_id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne({
      where: {
        user_id,
      },
    });

    return address;
  }

  public async create(addressData: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create(addressData);

    await this.ormRepository.save(address);

    return address;
  }

  public async save(address: Address): Promise<Address> {
    return this.ormRepository.save(address);
  }
}

export default AddressRepository;
