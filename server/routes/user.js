import express from "express";
import { getMyProfile, login, logout, register , driver_signup, getAvailableDrivers, setupRide, addRating, driverLogin, getDriverWallet, setDriverAvailability, endRide } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);
router.post("/login", login);

router.post("/logout", logout);

router.get("/me", isAuthenticated, getMyProfile);

// Post Driver Signup Reqeust
router.post("/driversignup",(driver_signup))

//Get Driver Data on The Client Side
router.get("/drivers",getAvailableDrivers)

router.post('/set_ride',setupRide)

router.post('/addrating',addRating)

router.post('/driverlogin',driverLogin)

router.post('adminlogin')

router.post('/driverwallet',getDriverWallet)

router.post('/setAvailability',setDriverAvailability)

router.post('/endRide',endRide)
// router.post("/new", register);
// router.post("/login", login);
// router.get("/logout", logout);
// Protected routes requiring authentication
// router.get("/me", isAuthenticated, getMyProfile);
// router.post("/driversignup", isAuthenticated, driver_signup);
// router.get("/drivers", isAuthenticated, getAvailableDrivers);
// router.post('/set_ride', isAuthenticated, setupRide);

export default router;