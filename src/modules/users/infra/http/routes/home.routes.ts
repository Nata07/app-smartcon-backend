import { Router } from 'express';
import HomeController from '../controllers/HomeController';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get('/providers', homeController.show);

export default homeRouter;
