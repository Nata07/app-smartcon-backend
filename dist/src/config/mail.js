"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    driver: process.env.MAIL_DRIVER || 'ethereal',
    // configurar email no SES
    defaults: {
        from: {
            email: 'equipe@smartcon.com.br',
            name: 'Equipe SmartCon',
        },
    },
};
