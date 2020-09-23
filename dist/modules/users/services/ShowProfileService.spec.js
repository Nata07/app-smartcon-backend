"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _ShowProfileService = _interopRequireDefault(require("./ShowProfileService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let showProfileService;
describe('ShowProfile', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    showProfileService = new _ShowProfileService.default(fake);
  });
  it('should be able to show profile', async () => {
    const user = await fake.create({
      name: 'teste',
      email: 'teste@email.com',
      password: '123456'
    });
    const profileUser = await showProfileService.execute({
      user_id: user.id
    });
    expect(profileUser.name).toBe('teste');
    expect(profileUser.email).toBe('teste@email.com');
  });
  it('should not be able to show profile', async () => {
    expect(showProfileService.execute({
      user_id: 'non-user-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});