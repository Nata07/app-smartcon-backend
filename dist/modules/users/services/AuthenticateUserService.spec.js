"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvder = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvder"));

var _AuthenticateUserService = _interopRequireDefault(require("./AuthenticateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import CreateUserService from './CreateUserService';
let fake;
let fakeHash; // let createUser: CreateUserService;

let authenticateUser;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    fakeHash = new _FakeHashProvder.default();
    authenticateUser = new _AuthenticateUserService.default(fake, fakeHash); // createUser = new CreateUserService(fake, fakeHash);
  });
  it('should be able to Authenticate', async () => {
    const user = await fake.create({
      name: 'jhon Doe',
      email: 'jondoe@email.com',
      password: '123456'
    });
    const response = await authenticateUser.execute({
      email: 'jondoe@email.com',
      password: '123456'
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
  it('should be able to Authenticate with password incorrect', async () => {
    await fake.create({
      name: 'jon',
      email: 'jon@email.com',
      password: '123456'
    });
    await expect(authenticateUser.execute({
      email: 'jon@email.com',
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to Authenticate with non existing user ', async () => {
    await expect(authenticateUser.execute({
      email: 'jon@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});