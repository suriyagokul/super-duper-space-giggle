import { Router } from "express";
import * as controller from "../controllers/appController.js";
import Auth, { localVariables } from "../middleware/Auth.js";
import { registerMail } from "../controllers/mailer.js";
const router = Router();

/** POST Methods */
router.route("/register").post(controller.register); // register user
router.route("/registerMail").post(registerMail); // send the email
router.route("/authenticate").post(controller.verifyUser,(req, res) => res.end()); // authenticate the user
router.route("/login").post(controller.verifyUser, controller.login); // login in app
router.route("/appointment").post(controller.createAppointment);


/** GET Methods */
router.route("/user/:username").get(controller.getUser); // user with username
router
  .route("/generateOTP")
  .get(controller.verifyUser, localVariables, controller.generateOTP); // generate random OTP
router.route("/verifyOTP").get(controller.verifyUser,controller.verifyOTP); // verify generated otp
router.route("/createResetSession").get(controller.createResetSession); // reset all the variables


/** PUT Methods */
router.route("/updateUser").put(Auth, controller.updateUser); // is use to update the user profile
router
  .route("/resetPassword")
  .put(controller.verifyUser, controller.resetPassword); // use to reset password


export default router;
