// import express from 'express';
// // import userContoller from '../controller/userContoller.js';
// import { userotpContoller, userRegistration, userLoginController ,updateUserProfileController ,updateUserPasswordController, userCatrerDashboardContoller , userShowUpcomingEventContoller , forgetPassOtpController , forgotPasswordController } from '../controller/userContoller.js';
// import {userEventRequestController , profileController} from '../controller/eventRequestFormController.js';
// var userRouter = express.Router();
// userRouter.post("/genrateOtp", userotpContoller)
// userRouter.post("/register", userRegistration);
// userRouter.post("/userLogin", userLoginController);
// userRouter.post("/eventRequest",userEventRequestController);
// userRouter.post("/profile",profileController);
// userRouter.post("/updateUserProfile",updateUserProfileController);
// userRouter.post("/checkRole", userCatrerDashboardContoller);
// userRouter.post("/upcomingEvent",userShowUpcomingEventContoller);
// userRouter.post("/genrateForgetPassOtp",forgetPassOtpController)
// userRouter.post("/forgotPassword",forgotPasswordController);
// userRouter.post("/updateUserPassword",updateUserPasswordController);


// export default userRouter;


import express from 'express';
// import userContoller from '../controller/userContoller.js';
import { userotpContoller, userRegistration, userLoginController ,seeVenueRequestedDataController,updateUserProfileController ,updateUserPasswordController, userCatrerDashboardContoller , userShowUpcomingEventContoller , forgetPassOtpController , forgotPasswordController,userShowRequestedDataController ,seeRequetedDataController , userPaymentForCatereBookController , bookingDecorationController , uploadImageController , userBookCatererController , viewQuatationController , bookingDjController , viewQuatationDataController} from '../controller/userContoller.js';
import {userEventRequestController , profileController} from '../controller/eventRequestFormController.js';
var userRouter = express.Router();
userRouter.post("/genrateOtp", userotpContoller)
userRouter.post("/register", userRegistration);
userRouter.post("/userLogin", userLoginController);
userRouter.post("/eventRequest",userEventRequestController);
userRouter.post("/profile",profileController);
userRouter.post("/updateUserProfile",updateUserProfileController);
userRouter.post("/checkRole", userCatrerDashboardContoller);
userRouter.post("/upcomingEvent",userShowUpcomingEventContoller);
userRouter.post("/genrateForgetPassOtp",forgetPassOtpController)
userRouter.post("/forgotPassword",forgotPasswordController);
userRouter.post("/updateUserPassword",updateUserPasswordController);
userRouter.post("/userShowRequestedData",userShowRequestedDataController);
userRouter.post("/seeRequetedData",seeRequetedDataController);
userRouter.post("/seeVenueRequetedData",seeVenueRequestedDataController);

userRouter.post("/viewQuatation/:userId",viewQuatationController);
userRouter.post("/viewQuatationData",viewQuatationDataController);

userRouter.post("/userPaymentForCatereBook",userPaymentForCatereBookController);
userRouter.get("/userBookCaterer",userBookCatererController);
userRouter.post("/bookingDecoration",bookingDecorationController);
userRouter.post("/bookingDj",bookingDjController);
userRouter.post("/uploadImage",uploadImageController);

export default userRouter;