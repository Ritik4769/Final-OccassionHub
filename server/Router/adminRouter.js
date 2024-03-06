import express from 'express';
import {
    adminShowUserController, adminShowCatererDataController, adminShowDjController, adminshowVeneueController, adminShowEventController,
    adminShowDecorationController, adminshowPassesDataController, adminLoginController, adminshowRequestedUserDjDataController, seedecorationdatatoadminController, sendRequesttoDecorationController , seedecorationRequestdatatoadminController , seeCatereDataToController , sendRequestToCatereController , seedjdatatoadminController , sendRequesttoDjController , adminBlockUserController , sendRequesttoVenueController , sendquatationController , adminviewRequestedUserVenueDataController , adminshowRequestedUserDecorationDataController , adminshowRequestedUserCatererDataController
} from '../controller/adminController.js';
var adminRouter = express.Router();
adminRouter.post("/adminLogin", adminLoginController);
adminRouter.post("/userData", adminShowUserController);
adminRouter.post("/catererData", adminShowCatererDataController);
adminRouter.post("/djData", adminShowDjController);
adminRouter.post("/veneueData", adminshowVeneueController);
adminRouter.post("/decorationData", adminShowDecorationController);
adminRouter.post("/eventData", adminShowEventController);
adminRouter.post("/passesData", adminshowPassesDataController);
adminRouter.post("/adminshowRequestedUserDecorationData",adminshowRequestedUserDecorationDataController);
adminRouter.post("/adminshowRequestedUserDjData", adminshowRequestedUserDjDataController);
adminRouter.post("/adminshowRequestedUserVenueData",adminviewRequestedUserVenueDataController);
adminRouter.post("/seedecorationdatatoadmin", seedecorationdatatoadminController);
adminRouter.post("/sendRequesttoDecoration", sendRequesttoDecorationController);
adminRouter.post("/seedecorationRequestdatatoadmin", seedecorationRequestdatatoadminController);
adminRouter.post("/seeCatereDataToAdmin", seeCatereDataToController);
adminRouter.post("/sendRequestToCatere", sendRequestToCatereController);
adminRouter.post("/seedjdatatoadmin", seedjdatatoadminController);
adminRouter.post("/sendRequesttoDj", sendRequesttoDjController);
adminRouter.post("/adminBlockUser",adminBlockUserController)
adminRouter.post("/sendRequesttoVenue", sendRequesttoVenueController);
adminRouter.post('/sendquatation' , sendquatationController);
adminRouter.post("/adminshowRequestedUserCatererData",adminshowRequestedUserCatererDataController);



export default adminRouter;