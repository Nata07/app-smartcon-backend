import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateuserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, phone, type, password } = request.body;
    const createUser = container.resolve(CreateuserService);

    const user = await createUser.execute({
      name,
      email,
      phone,
      type,
      password,
    });

    delete user.password;

    return response.json(classToClass(user));
  }
}
