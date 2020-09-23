"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("reflect-metadata");

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _INotificationsRepository = _interopRequireDefault(require("../../notfications/repositories/INotificationsRepository"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateAppointmentService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('NotificationsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default, typeof _INotificationsRepository.default === "undefined" ? Object : _INotificationsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateAppointmentService {
  constructor(appointmentRepository, notificationRepository, cacheProvider) {
    this.appointmentRepository = appointmentRepository;
    this.notificationRepository = notificationRepository;
    this.cacheProvider = cacheProvider;
  }

  async excecute({
    date,
    provider_id,
    user_id
  }) {
    const appointmentDate = (0, _dateFns.startOfHour)(date);

    if ((0, _dateFns.isBefore)(appointmentDate, Date.now())) {
      throw new _AppError.default('You cant create appointment on past date');
    }

    const findAppointmentsInSameDate = await this.appointmentRepository.findByDate(appointmentDate, provider_id);

    if (user_id === provider_id) {
      throw new _AppError.default('You not create appointment from you');
    }

    if ((0, _dateFns.getHours)(appointmentDate) < 8 || (0, _dateFns.getHours)(appointmentDate) > 17) {
      throw new _AppError.default('You cant only create appointmnet between 8 and 17 hours');
    }

    if (findAppointmentsInSameDate) {
      throw new _AppError.default('This appointment is already booked');
    }

    const appointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
      user_id
    });
    const dateFormated = (0, _dateFns.format)(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");
    await this.notificationRepository.create({
      recipient_id: provider_id,
      content: `Você possui um novo agendamento para o dia ${dateFormated}`
    });
    await this.cacheProvider.invalidate(`providers-appointment:${provider_id}:${(0, _dateFns.format)(appointmentDate, 'yyyy-M-d')}`);
    return appointment;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
var _default = CreateAppointmentService;
exports.default = _default;