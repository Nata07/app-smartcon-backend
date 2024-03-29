import { Request, Response } from 'express';
import ListProviderService from '@modules/appointments/services/ListProviderService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';

export default class HomeController {
  public async show(request: Request, response: Response): Promise<Response> {
    const listPoviders = container.resolve(ListProviderService);
    const user_id = '';
    const providers = await listPoviders.execute({ user_id });

    return response.json(classToClass(providers));
  }
}
