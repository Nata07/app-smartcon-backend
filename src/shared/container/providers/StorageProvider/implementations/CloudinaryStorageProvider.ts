import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import cloudinary from 'cloudinary';
import IStorageProvider from '../models/IStorageProvider';

export default class CloudinaryStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const originalPath = path.resolve(uploadConfig.tempFolder, file);
    let filename = '';

    await cloudinary.v2.uploader.upload(
      originalPath,
      {
        transformation: {
          width: 200,
          height: 200,
          radius: 100,
        },
        folder: process.env.CLOUDINARY_FOLDER,
        public_id: file,
      },
      (err, result) => {
        if (err) {
          throw new AppError(`Couldnt upload photo. Error: ${err.message}`);
        }
        filename = result?.url || '';
      },
    );

    return filename;
  }

  public async deleteFile(file: string): Promise<void> {
    const publicId = file.substring(63, file.length - 4);

    await cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    await cloudinary.v2.api.delete_resources([publicId], (err, result) => {
      if (err) {
        throw new AppError('Couldnt delete photo');
      }
      console.log(result);
    });
  }
}
