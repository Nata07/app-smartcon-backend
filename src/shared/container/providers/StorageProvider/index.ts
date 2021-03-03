import { container } from 'tsyringe';
// import uploadConfig from '@config/upload';

import IStorageProvider from './models/IStorageProvider';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import CloudinaryStorageProvider from './implementations/CloudinaryStorageProvider';
// import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageProvider,
  cloudinary: CloudinaryStorageProvider,
  // s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.cloudinary,
);
