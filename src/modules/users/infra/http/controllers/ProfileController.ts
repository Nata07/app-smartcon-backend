import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfilleService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';
import UsersRepository from '../../typeorm/repositories/UsersRepository';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfilleService);

    const user = await showProfileService.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      email,
      name,
      phone,
      occupation,
      register,
      password,
      old_password,
    } = request.body;

    const authenticateUser = container.resolve(UpdateProfileService);

    const user = await authenticateUser.execute({
      user_id,
      name,
      email,
      phone,
      occupation,
      register,
      password,
      old_password,
    });

    return response.json(classToClass(user));
  }

  public async about(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { about } = request.body;

    const showProfileService = container.resolve(ShowProfilleService);
    const userRepositoy = new UsersRepository();
    const user = await showProfileService.execute({ user_id });

    user.about = about;

    await userRepositoy.save(user);

    return response.json(classToClass(user));
  }
}
