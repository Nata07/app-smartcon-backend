"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _UpdateProfileService = _interopRequireDefault(require("../../../services/UpdateProfileService"));

var _ShowProfileService = _interopRequireDefault(require("../../../services/ShowProfileService"));

var _classTransformer = require("class-transformer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProfileController {
  async show(request, response) {
    const user_id = request.user.id;

    const showProfileService = _tsyringe.container.resolve(_ShowProfileService.default);

    const user = await showProfileService.execute({
      user_id
    });
    delete user.password;
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async update(request, response) {
    const user_id = request.user.id;
    const {
      email,
      name,
      password,
      oldPassword
    } = request.body;

    const authenticateUser = _tsyringe.container.resolve(_UpdateProfileService.default);

    const user = await authenticateUser.execute({
      user_id,
      name,
      email,
      password,
      oldPassword
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = ProfileController;