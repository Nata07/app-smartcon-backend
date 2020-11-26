import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createUser = container.resolve(CreateUserService);
    const createAppointment = container.resolve(CreateAppointmentService);

    const { provider_id, date, name, email, phone, permission } = request.body;

    const password = 'smartcon2020';

    const user = await createUser.execute({
      name,
      email,
      phone,
      password,
      permission,
    });

    const user_id = user.id;

    const appointment = await createAppointment.excecute({
      provider_id,
      date,
      user_id,
    });

    return response.json(appointment);
  }
}
