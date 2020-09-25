"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("reflect-metadata");
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
require("express-async-errors");
require("@shared/infra/typeorm");
var upload_1 = __importDefault(require("@config/upload"));
var AppError_1 = __importDefault(require("../../errors/AppError"));
require("@shared/container");
var routes_1 = __importDefault(require("./routes"));
var rateLimiter_1 = __importDefault(require("./middlewares/rateLimiter"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/files', express_1.default.static(upload_1.default.uploadFolder));
app.use(rateLimiter_1.default);
app.use(routes_1.default);
app.use(celebrate_1.errors());
app.use(function (err, request, response, _) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
    });
});
app.listen(3333, function () {
    console.log("server on \uD83D\uDE80\uD83D\uDE80");
});
