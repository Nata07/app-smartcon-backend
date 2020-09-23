"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeHashProvder = _interopRequireDefault(require("../providers/HashProvider/fakes/FakeHashProvder"));

var _CreateUserService = _interopRequireDefault(require("./CreateUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let fakeHash;
let createUser;
let fakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    fakeHash = new _FakeHashProvder.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createUser = new _CreateUserService.default(fake, fakeHash, fakeCacheProvider);
  });
  it('should be able to create a new User', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    expect(user).toHaveProperty('id');
  });
  it('should not be able to create two User on the same email from another', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    await expect(createUser.execute({
      name: 'John Doe',
      email: 'jn@email.com',
      password: '123456'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});