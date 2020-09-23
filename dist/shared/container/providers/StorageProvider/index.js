"use strict";

var _tsyringe = require("tsyringe");

var _DiskStorageProvider = _interopRequireDefault(require("./implementations/DiskStorageProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import S3StorageProvider from './implementations/S3StorageProvider';
const providers = {
  disk: _DiskStorageProvider.default // s3: S3StorageProvider,

};

_tsyringe.container.registerSingleton('StorageProvider', providers.disk);