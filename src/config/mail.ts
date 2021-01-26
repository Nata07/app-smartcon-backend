interface IMailConfig {
  driver: 'ethereal' | 'ses' | 'zoho';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  // configurar email no SES
  defaults: {
    from: {
      email: 'contato@smartcon.app',
      name: 'Plataforma | Smartcon',
    },
  },
} as IMailConfig;
