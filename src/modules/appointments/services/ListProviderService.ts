import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {
  constructor(
    @inject('UsersRepository') private usersRespository: IUsersRepository,
    @inject('CacheProvider') private cacheRepository: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users: User[] = [];
    // const users = await this.usersRespository.findAllProviders({
    //   except_user_id: user_id,
    // });

    // let users = await this.cacheRepository.recover<User[]>(
    //   `providers-list:${user_id}`,
    // );

    if (!users || users.length === 0) {
      users = await this.usersRespository.findAllProviders({
        except_user_id: user_id,
      });

      await this.cacheRepository.save(
        `providers-list:${user_id}`,
        classToClass(users),
      );
    }

    return users;
  }
}

export default ListProviderService;
