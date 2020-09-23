"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateuserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateuserService {
  constructor(userRepository, hashProvider, cacheRepository) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.cacheRepository = cacheRepository;
  }

  async execute({
    name,
    email,
    phone,
    type,
    password
  }) {
    const duplicatedEmail = await this.userRepository.findByEmail(email); // console.log(duplicatedEmail);

    if (duplicatedEmail) {
      throw new _AppError.default('Email address alredy used');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.userRepository.create({
      name,
      email,
      phone,
      type,
      password: hashedPassword
    });
    await this.cacheRepository.invalidadePrefix('providers-list');
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateuserService;
exports.default = _default;