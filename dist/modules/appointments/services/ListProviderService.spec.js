"use strict";

var _FakeUsersRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUsersRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _ListProviderService = _interopRequireDefault(require("./ListProviderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let listProviders;
let fakeCacheProvider;
describe('ShowProfile', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProviders = new _ListProviderService.default(fake, fakeCacheProvider);
  });
  it('should be able to list the providers', async () => {
    const user = await fake.create({
      name: 'teste',
      email: 'teste@email.com',
      password: '123456'
    });
    const user2 = await fake.create({
      name: 'John Tre',
      email: 'johntre@email.com',
      password: '123456'
    });
    const logged = await fake.create({
      name: 'logged',
      email: 'userlogged@email.com',
      password: '123456'
    });
    const providers = await listProviders.execute({
      user_id: logged.id
    });
    expect(providers).toEqual([user, user2]);
  });
});