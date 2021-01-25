import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';
import mailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
export default class ZohoMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    this.client = nodemailer.createTransport({
      host: 'smtp.zoho.com',
      secure: true,
      port: 465,
      auth: {
        user: process.env.MAIL_ADDRESS,
        pass: process.env.MAIL_TOKEN,
      },
    });
  }

  public async sendEmail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    const { email, name } = mailConfig.defaults.from;
    try {
      await this.client.sendMail({
        from: {
          name: from?.name || name,
          address: from?.email || email,
        },
        to: {
          name: to.name,
          address: to.email,
        },
        subject,
        html: await this.mailTemplateProvider.parse(templateData),
      });
    } catch (err) {
      console.log(err);
    }
  }
}
