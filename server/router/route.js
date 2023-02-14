import { Router } from 'express';
const router = Router();

/* import all controllers */
import * as controller from '../controllers/appController.js';

/* POST Methods */
router.route('/register').post(controller.register); //register user
/* router.route('/registerMail').post(); */ // send the mail
router.route('/authenticate').post((req, res) => res.end()); // authenticate user
router.route('/login').post(controller.verifyUser, controller.login); //login in app

/*  GET Methods */
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOTP').get(controller.generateOTP); // generate random OTP
router.route('/verifyOTP').get(controller.verifyOTP); // verify generated OTP
router.route('/createResetSession').get(controller.createResetSession); // reset all variables

/* PUT Methods */
router.route('/updateUser').put(controller.updateUser); // to update user profile
router.route('/resetPassword').put(controller.resetPassword); // reset password

export default router;