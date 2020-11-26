import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const createUser = container.resolve(CreateUserService);
    const createAppointment = container.resolve(CreateAppointmentService);

    let user_id = '';
    const { provider_id, date, name, email, phone, permission } = request.body;

    const password = 'smartcon2020';
    const userExist = await userRepository.findByEmail(email);

    if (userExist) {
      user_id = userExist.id;
      console.log(user_id);
    } else {
      const user = await createUser.execute({
        name,
        email,
        phone,
        password,
        permission,
      });

      user_id = user.id;
    }

    const appointment = await createAppointment.excecute({
      date,
      provider_id,
      user_id,
    });
    console.log(appointment);
    return response.json(appointment);
  }
}
