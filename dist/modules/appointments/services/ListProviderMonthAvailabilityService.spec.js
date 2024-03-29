"use strict";

var _ListProviderMonthAvailibilityService = _interopRequireDefault(require("./ListProviderMonthAvailibilityService"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderMonthAvailability;
let fakeAppointment;
describe('ListProviderMonthAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointment = new _FakeAppointmentRepository.default();
    listProviderMonthAvailability = new _ListProviderMonthAvailibilityService.default(fakeAppointment);
  });
  it('should be able to availability month from provider', async () => {
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
      user_id: 'asdsad'
    });
    await fakeAppointment.create({
      provider_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
      user_id: 'asdsad'
    });
    const availability = await listProviderMonthAvailability.execute({
      provider_id: 'user',
      year: 2020,
      month: 5
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 19,
      available: true
    }, {
      day: 20,
      available: false
    }, {
      day: 21,
      available: true
    }, {
      day: 22,
      available: true
    }]));
  });
});