"use strict";

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

var _FakeUserTokensRepository = _interopRequireDefault(require("../repositories/fakes/FakeUserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUser;
let fakeEmailProvider;
let fakeUserToken;
let sendForgotEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUser = new _FakeUsersRepository.default();
    fakeEmailProvider = new _FakeMailProvider.default();
    fakeUserToken = new _FakeUserTokensRepository.default();
    sendForgotEmail = new _SendForgotPasswordEmailService.default(fakeUser, fakeEmailProvider, fakeUserToken);
  });
  it('should be able to recover password using email', async () => {
    const sendEmail = jest.spyOn(fakeEmailProvider, 'sendEmail');
    const user = await fakeUser.create({
      name: 'Jhon Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    await sendForgotEmail.execute({
      email: user.email
    });
    expect(sendEmail).toHaveBeenCalled();
  });
  it('should not recover password to inexist user ', async () => {
    await expect(sendForgotEmail.execute({
      email: 'jn@email.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserToken, 'generate');
    const user = await fakeUser.create({
      name: 'Jhon Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    await sendForgotEmail.execute({
      email: user.email
    });
    expect(generate).toHaveBeenCalledWith(user.id);
  });
});