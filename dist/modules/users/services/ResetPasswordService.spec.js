"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

var _ResetPasswordService = _interopRequireDefault(require("./ResetPasswordService"));

var _FakeHashProvder = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUser;
let fakeUserToken;
let resetPassword;
let fakeHash;
describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUser = new _FakeUsersRepository.default();
    fakeUserToken = new _FakeUserTokensRepository.default();
    fakeHash = new _FakeHashProvder.default();
    resetPassword = new _ResetPasswordService.default(fakeUser, fakeUserToken, fakeHash);
  });
  it('should be able to reset password ', async () => {
    const user = await fakeUser.create({
      name: 'Jhon Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserToken.generate(user.id);
    const generateHash = jest.spyOn(fakeHash, 'generateHash');
    await resetPassword.execute({
      password: '123123',
      token
    });
    const updateUser = await fakeUser.findById(user.id);
    expect(generateHash).toBeCalledWith('123123');
    expect(updateUser === null || updateUser === void 0 ? void 0 : updateUser.password).toBe('123123');
  });
  it('should not recover password non-exist token', async () => {
    await expect(resetPassword.execute({
      token: 'non-existing',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not recover password non-exist user', async () => {
    const user = await fakeUser.create({
      name: 'Jhon Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    const {
      token
    } = await fakeUserToken.generate(user.id);
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able recover password after two hours', async () => {
    const {
      token
    } = await fakeUserToken.generate('non-existing-user');
    await expect(resetPassword.execute({
      token,
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});