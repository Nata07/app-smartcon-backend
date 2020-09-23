"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _IAppointmentsRepository = _interopRequireDefault(require("../repositories/IAppointmentsRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListProviderDayAvailabilityService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('AppointmentsRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IAppointmentsRepository.default === "undefined" ? Object : _IAppointmentsRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class ListProviderDayAvailabilityService {
  constructor(appointmentRespository) {
    this.appointmentRespository = appointmentRespository;
  }

  async execute({
    provider_id,
    month,
    year,
    day
  }) {
    const appointments = await this.appointmentRespository.findAllInDayFromProvider({
      provider_id,
      month,
      year,
      day
    });
    const hourStart = 8;
    const eachHourArray = Array.from({
      length: 10
    }, (_, index) => index + hourStart);
    const currentDate = new Date(Date.now());
    const availavility = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(appointment => (0, _dateFns.getHours)(appointment.date) === hour);
      const compateDate = new Date(year, month, day, hour); // console.log(currentDate);
      // console.log(compateDate);
      // console.log(hasAppointmentInHour);

      return {
        hour,
        available: !hasAppointmentInHour && (0, _dateFns.isAfter)(compateDate, currentDate)
      };
    });
    console.log(currentDate);
    console.log(month);
    console.log(day);
    console.log(availavility);
    return availavility;
  }

}) || _class) || _class) || _class) || _class);
var _default = ListProviderDayAvailabilityService;
exports.default = _default;