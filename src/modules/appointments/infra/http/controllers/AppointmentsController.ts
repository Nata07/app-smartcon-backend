import AppError from '@shared/errors/AppError';
import CreateUserService from '@modules/users/services/CreateUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { format } from 'date-fns';
import SendSchedulingAppointmentEmailService from '@modules/appointments/services/SendSchedulingAppointmentEmailService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = new UsersRepository();
    const createUser = container.resolve(CreateUserService);
    const createAppointment = container.resolve(CreateAppointmentService);

    const sendSchedulingAppointment = container.resolve(
      SendSchedulingAppointmentEmailService,
    );

    let user_id = '';
    let user;
    const { provider_id, date, name, email, phone, permission } = request.body;
    const provider = await userRepository.findById(provider_id);

    const password = 'smartcon2020';
    const userExist = await userRepository.findByEmail(email);

    if (provider === undefined) {
      return AppError('Provider does not exist!');
    }
    if (userExist) {
      user_id = userExist.id;
    } else {
      user = await createUser.execute({
        name,
        email,
        phone,
        register: '0',
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

    const dateFormated = format(appointment.date, "dd/MM/yyyy 'às' HH:mm'h'");

    await sendSchedulingAppointment.execute({
      provider_email: provider.email,
      provider_name: provider.name,
      user_email: userExist?.email ? userExist?.email : user?.email,
      date_appointment: dateFormated,
    });

    return response.json(appointment);
  }
}
