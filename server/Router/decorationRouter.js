import express from 'express';
import { decorationRegistration ,searchDecorationController , seeNormalUserTodecorationRequest , decorationSeeRequestedData , acceptRequestOfUserController , decorationSeeAdminRequestedDataController , acceptRequestOfAdminController , updateDecorationProfileController , updateDecorationPasswordController , DecorationBankDetailController } from '../controller/decorationController.js';
var DecorationRouter = express.Router();

DecorationRouter.post("/decorationRegister", decorationRegistration);
DecorationRouter.get("/searchServices", searchDecorationController);
DecorationRouter.post("/seeNormalUserTodecorationRequest" , seeNormalUserTodecorationRequest)
DecorationRouter.post("/decorationSeeRequestedData" , decorationSeeRequestedData)
DecorationRouter.post("/acceptRequestOfUser/:userEmail" , acceptRequestOfUserController)
DecorationRouter.post("/acceptRequestOfAdmin" , acceptRequestOfAdminController)
DecorationRouter.post("/decorationSeeAdminRequestedData" , decorationSeeAdminRequestedDataController)
DecorationRouter.post("/updateDecorationProfile", updateDecorationProfileController);
DecorationRouter.post("/updateDecorationPassword",updateDecorationPasswordController);
DecorationRouter.post("/DecorationBankDetail",DecorationBankDetailController)

export default DecorationRouter;