import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  permission: 'ADMIN' | 'PROVIDER' | 'USER';
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider') private cacheRepository: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    phone,
    password,
    permission,
  }: IRequest): Promise<User> {
    const duplicatedEmail = await this.userRepository.findByEmail(email);

    // console.log(duplicatedEmail);

    if (duplicatedEmail) {
      throw new AppError('Email address alredy used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      phone,
      password: hashedPassword,
      permission,
    });

    await this.cacheRepository.invalidadePrefix('providers-list');

    return user;
  }
}

export default CreateUserService;
