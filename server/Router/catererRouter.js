import express from 'express';
import {
    caterrerRegistration, searchCatrerController,
    seeNormalUserToCatereRequestController, catereSeeRequestedDataController,
    updateCatereProfileController, catereSendRequestTouserController, isBookedCatereOrNot , adminRequestDataController , catereSendRequestToAdminController , updateCatererPasswordController , CatererBankDetailsController
} from '../controller/caterereController.js';
var catrererRouter = express.Router();

catrererRouter.post("/catererRegister", caterrerRegistration);
catrererRouter.post("/searchServices", searchCatrerController);
catrererRouter.post("/seeNormalUserToCatereRequest", seeNormalUserToCatereRequestController);
catrererRouter.post("/catereSeeRequestedData", catereSeeRequestedDataController);
catrererRouter.post("/updateCatereProfile", updateCatereProfileController);
catrererRouter.post("/sendResponseToUserPrice", catereSendRequestTouserController);
catrererRouter.post('/isAleradyBookedOrNot', isBookedCatereOrNot);
catrererRouter.post('/adminRequestData', adminRequestDataController);
catrererRouter.post("/sendResponseToAdminPrice",catereSendRequestToAdminController);
catrererRouter.post('/updateCatererPassword',updateCatererPasswordController);
catrererRouter.post('/catererBankDetail',CatererBankDetailsController);

export default catrererRouter;