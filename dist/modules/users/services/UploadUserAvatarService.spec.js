"use strict";

var _FakeStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/fakes/FakeStorageProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _UploadUserAvatarService = _interopRequireDefault(require("./UploadUserAvatarService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fake;
let fakeStorage;
let updateUserAvatar;
describe('UploadUserAvatar', () => {
  beforeEach(() => {
    fake = new _FakeUsersRepository.default();
    fakeStorage = new _FakeStorageProvider.default();
    updateUserAvatar = new _UploadUserAvatarService.default(fake, fakeStorage);
  });
  it('should be able to create a new User', async () => {
    const user = await fake.create({
      name: 'John Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id
    });
    expect(user.avatar).toBe('teste.jpg');
  });
  it('non exist user update avatar', async () => {
    expect(updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: 'non-exist'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should delete user avatar when upload new one', async () => {
    const deleteFile = jest.spyOn(fakeStorage, 'deleteFile');
    const user = await fake.create({
      name: 'John Doe',
      email: 'jn@email.com',
      password: '123456'
    });
    await updateUserAvatar.execute({
      avatarFilename: 'teste.jpg',
      user_id: user.id
    });
    await updateUserAvatar.execute({
      avatarFilename: 'teste2.jpg',
      user_id: user.id
    });
    expect(deleteFile).toHaveBeenCalledWith('teste.jpg');
    expect(user.avatar).toBe('teste2.jpg');
  });
});