"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var crypto_1 = __importDefault(require("crypto"));
var multer_1 = __importDefault(require("multer"));
var tempFolder = path_1.default.resolve(__dirname, '..', '..', 'temp');
exports.default = {
    driver: process.env.STORAGE_DRIVER,
    tempFolder: tempFolder,
    uploadFolder: path_1.default.resolve(tempFolder, 'uploads'),
    multer: {
        storage: multer_1.default.diskStorage({
            destination: tempFolder,
            filename: function (req, file, callback) {
                var fileHash = crypto_1.default.randomBytes(10).toString('hex');
                var fileName = fileHash + "-" + file.originalname;
                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: 'app-gobarber',
        },
    },
};
