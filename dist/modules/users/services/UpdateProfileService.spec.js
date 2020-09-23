"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvder = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvder"));

var _UpdateProfileService = _interopRequireDefault(require("./UpdateProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let fakeHash;
let updateProfile;
describe('UpdateProfile', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    fakeHash = new _FakeHashProvder.default();
    updateProfile = new _UpdateProfileService.default(fake, fakeHash);
  });
  it('should be able to create a new User', async () => {
    const user = await fake.create({
      name: 'annnasdnad',
      email: 'sdsdsa@email.com',
      password: '123456'
    });
    const updateuser = await updateProfile.execute({
      user_id: user.id,
      name: 'Alter names',
      email: 'alteremail@email.com'
    });
    expect(updateuser.name).toBe('Alter names');
  });
  it('should not be able to create user with existing email ', async () => {
    await fake.create({
      name: 'NAtanael',
      email: 'nata@email.com',
      password: '123456'
    });
    const user = await fake.create({
      name: 'natanael 1',
      email: 'natanael@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Alter names',
      email: 'nata@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to update the password', async () => {
    const user = await fake.create({
      name: 'annnasdnad',
      email: 'sdsdsa@email.com',
      password: '123456'
    });
    const updateuser = await updateProfile.execute({
      user_id: user.id,
      name: 'Alter names',
      email: 'alteremail@email.com',
      oldPassword: '123456',
      password: '123123'
    });
    expect(updateuser.password).toBe('123123');
  });
  it('should not be able to update the password without old password', async () => {
    const user = await fake.create({
      name: 'annnasdnad',
      email: 'sdsdsa@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Alter names',
      email: 'alteremail@email.com',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to update the password with wrong old password', async () => {
    const user = await fake.create({
      name: 'annnasdnad',
      email: 'sdsdsa@email.com',
      password: '123456'
    });
    await expect(updateProfile.execute({
      user_id: user.id,
      name: 'Alter names',
      email: 'alteremail@email.com',
      oldPassword: '1234567',
      password: '123123'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});