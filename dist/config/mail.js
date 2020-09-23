"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  // configurar email no SES
  defaults: {
    from: {
      email: 'equipe@smartcon.com.br',
      name: 'Equipe SmartCon'
    }
  }
};
exports.default = _default;