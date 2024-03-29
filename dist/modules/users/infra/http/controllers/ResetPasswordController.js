"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _ResetPasswordService = _interopRequireDefault(require("../../../services/ResetPasswordService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(request, response) {
    const {
      password,
      token
    } = request.body;

    const sendForgotPassword = _tsyringe.container.resolve(_ResetPasswordService.default);

    await sendForgotPassword.execute({
      password,
      token
    });
    return response.status(204).json();
  }

}

exports.default = ResetPasswordController;