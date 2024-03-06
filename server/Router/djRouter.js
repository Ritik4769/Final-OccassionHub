import express from 'express';
import { djRegistrationContoller, searchDjController, djBookUserController, djProfileDataFindController, seeRequetDjToUserController, ConfirmrequestSendUserController, updateDjProfileController, djBookDatecheakController , CusetomerOderConfirmController , djSeeAdminRequestedDataController , acceptRequestOfAdminController , updateDjPasswordController , DjBankDetailController} from '../controller/djController.js';
var DjRouter = express.Router();

DjRouter.post("/djRegister", djRegistrationContoller);
DjRouter.get("/searchServices", searchDjController);
DjRouter.post("/djBookUser", djBookUserController);
DjRouter.post("/djProfileDataFind", djProfileDataFindController);
DjRouter.post("/seeRequetDjToUser", seeRequetDjToUserController);
DjRouter.post("/ConfirmrequestSendUser", ConfirmrequestSendUserController);
DjRouter.post("/updateDjProfile", updateDjProfileController);
DjRouter.post("/djBookDatecheak", djBookDatecheakController);
DjRouter.post("/CusetomerOderConfirm",CusetomerOderConfirmController);
DjRouter.post("/djSeeAdminRequestedData",djSeeAdminRequestedDataController);
DjRouter.post("/acceptRequestOfAdmin" , acceptRequestOfAdminController);
DjRouter.post("/updateDjPassword",updateDjPasswordController);
DjRouter.post("/DjBankDetail",DjBankDetailController)

export default DjRouter;