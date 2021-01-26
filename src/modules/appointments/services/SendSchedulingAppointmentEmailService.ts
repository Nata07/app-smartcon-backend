import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  provider_email: string;
  provider_name: string;
  user_email: string;
  date_appointment: string;
}

@injectable()
class SendSchedulingAppointmentEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({
    provider_email,
    provider_name,
    user_email,
    date_appointment,
  }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(user_email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const schedulingAppointmentTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'scheduling_appointment.hbs',
    );

    await this.mailProvider.sendEmail({
      to: {
        name: 'Agendamento de consultas',
        email: 'agendamentos@smartcon.app',
      },
      subject: 'Solicitação de Agendamento',
      templateData: {
        file: schedulingAppointmentTemplate,
        variables: {
          doctor_name: provider_name,
          doctor_email: provider_email,
          user_name: user.name,
          user_email: user.email,
          user_phone: user.phone,
          date_appointment,
        },
      },
    });
  }
}

export default SendSchedulingAppointmentEmailService;
