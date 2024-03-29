"use strict";

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderDayAvailabilityService = _interopRequireDefault(require("./ListProviderDayAvailabilityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderDayAvailability;
let fakeAppointment;
describe('ListProviderDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointment = new _FakeAppointmentRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabilityService.default(fakeAppointment);
  });
  it('should be able to availability day from provider', async () => {
    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'user-ssas',
      date: new Date(2020, 4, 20, 8, 0, 0)
    });
    await fakeAppointment.create({
      provider_id: 'user',
      user_id: 'user-ssas',
      date: new Date(2020, 4, 20, 10, 0, 0)
    });
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const availability = await listProviderDayAvailability.execute({
      provider_id: 'user',
      month: 5,
      year: 2020,
      day: 20
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: true
    }, {
      hour: 10,
      available: false
    }, {
      hour: 11,
      available: true
    }]));
  });
});