"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _Appointment = _interopRequireDefault(require("../../infra/typeorm/entities/Appointment"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeAppointmentRepository {
  constructor() {
    this.appointments = [];
  }

  async findByDate(date, provider_id) {
    const findAppointment = this.appointments.find(appointment => (0, _dateFns.isEqual)(appointment.date, date) && appointment.provider_id === provider_id);
    return findAppointment;
  }

  async findAllInMOnthFromProvider({
    provider_id,
    month,
    year
  }) {
    const findAppointment = await this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return findAppointment;
  }

  async findAllInDayFromProvider({
    provider_id,
    month,
    year,
    day
  }) {
    const findAppointment = await this.appointments.filter(appointment => appointment.provider_id === provider_id && (0, _dateFns.getDate)(appointment.date) === day && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year);
    return findAppointment;
  }

  async create({
    provider_id,
    user_id,
    date
  }) {
    const appointment = new _Appointment.default();
    Object.assign(appointment, {
      id: (0, _uuidv.uuid)(),
      date,
      provider_id
    });
    this.appointments.push(appointment);
    return appointment;
  }

}

var _default = FakeAppointmentRepository;
exports.default = _default;