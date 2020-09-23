"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _FakeNotificationsRepository = _interopRequireDefault(require("../../notfications/repositories/fakes/FakeNotificationsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let createAppointments;
let fakeNotification;
let fakeCacheProvider;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fake = new _FakeAppointmentRepository.default();
    fakeNotification = new _FakeNotificationsRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointments = new _CreateAppointmentService.default(fake, fakeNotification, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    const appointment = await createAppointments.excecute({
      date: new Date(2020, 4, 10, 13),
      user_id: 'user-ssas',
      provider_id: '123123123'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });
  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);
    createAppointments.excecute({
      date: appointmentDate,
      user_id: 'user-ssas',
      provider_id: '123123123'
    });
    await expect(createAppointments.excecute({
      date: appointmentDate,
      user_id: 'user-ssas',
      provider_id: '123123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointments on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointments.excecute({
      date: new Date(2020, 4, 10, 11),
      user_id: 'user',
      provider_id: 'provider'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointments.excecute({
      date: new Date(2020, 4, 10, 11),
      user_id: '123456',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8 hours and after 17 hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });
    await expect(createAppointments.excecute({
      date: new Date(2020, 4, 10, 7),
      user_id: '123456',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointments.excecute({
      date: new Date(2020, 4, 10, 18),
      user_id: '123456',
      provider_id: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});