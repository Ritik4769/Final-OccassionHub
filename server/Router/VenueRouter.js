import express from "express";
import { venueRegistration, searchVenuController, updateVenueProfileController,venueBookUserController, venueSendRequestTouserController,getRequestData,venueSeeRequestedDataController , venueSeeAdminRequestedDataController , venueSendRequestToAdminController , updateVenuePasswordController , VenueBankDetailController} from "../controller/venueController.js"; var VenueRouter = express.Router();
VenueRouter.post("/VenueRegister", venueRegistration);
VenueRouter.post("/searchServices", searchVenuController);
VenueRouter.post("/venueBookUser", venueBookUserController);
VenueRouter.post("/venueSeeRequestedData", venueSeeRequestedDataController);
VenueRouter.post("/sendResponseToUser", venueSendRequestTouserController);
VenueRouter.post("/getRequestData", getRequestData);
VenueRouter.post("/updateVenueProfile", updateVenueProfileController);
VenueRouter.post("/venueSeeAdminRequestedData", venueSeeAdminRequestedDataController);
VenueRouter.post("/sendResponseToadmin", venueSendRequestToAdminController);
VenueRouter.post("/updateVenuePassword",updateVenuePasswordController);
VenueRouter.post("/VenueBankDetail",VenueBankDetailController);

export default VenueRouter;