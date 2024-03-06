import express from 'express';
import { passesDataController } from '../controller/passesController.js';
var passesRouter = express.Router();
passesRouter.post("/passesData",passesDataController);

export default passesRouter;