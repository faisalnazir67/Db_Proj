import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";
import { v4 as uuidv4 } from 'uuid';

import { Driver } from "../models/user.js";
import { Ride } from "../models/user.js";
import { ObjectId } from 'mongodb';

// CLient login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));
    console.log("Setting up cookie")
    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
   
    next(error);
  }
};

//Driver Login

export const driverLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const driver = await Driver.findOne({ email }).select("+password");

    if (!driver) return next(new ErrorHandler("Invalid Email or Password", 400));

    const isMatch = await bcrypt.compare(password, driver.password);
   
    if (!isMatch)
      return next(new ErrorHandler("Invalid Email or Password", 400));

    // Assuming 'sendCookie' is a function to set cookies; modify as per your setup
    sendCookie(driver, res, `Welcome back, ${driver.name}`, 200);
  } catch (error) {
    next(error);
  }
};

//Client  Register
export const register = async (req, res,next) => {
  try {
    
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({ name, email, password: hashedPassword });
   
    sendCookie(user, res, "Registered Successfully", 201);
   
  } catch (error) {
   
    next(error);
  }
};

//Driver Signup
export const driver_signup = async (req, res, next) => {
  try {

    // console.log("In Driver Signup")
    const { name, email, password, phoneNumber, carName, licenseNumber } = req.body;

    let driver = await Driver.findOne({ email });

    if (driver) return next(new ErrorHandler("Driver Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const wallet = Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000;


    driver = await Driver.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      carName,
      licenseNumber,
      wallet,
    });

    // Handle response or send cookie if needed

    sendCookie(driver, res, "Driver Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};


// Get Driver Data
export const getAvailableDrivers = async (req, res, next) => {

  try {
    // Find drivers where availability is 1 and project specific fields

    const drivers = await Driver.find({ available: 1 }, 'name phoneNumber carName licenseNumber');

    res.status(200).json({
      success: true,
      count: drivers.length,
      drivers: drivers,
    });
  } catch (error) {
    next(error);
  }
};

// Set up a ride
export const setupRide = async (req, res, next) => {
  try {
    const { driver_id, driver_name, user_name, fare, end_location } = req.body;

    // Log the ride data
    console.log('Received ride setup request:');
    console.log('Driver ID:', driver_id);
    console.log('Driver Name:', driver_name);
    console.log('User Name:', user_name);
    console.log('Fare:', fare);
    console.log('End Location:', end_location);

    const ride_id = uuidv4();


    // Create a new ride document using the Ride model
    const newRide = await Ride.create({
      ride_id: ride_id,
      driver_id: driver_id,
      user_name: user_name,
      start_location: 'LUMS', // Assuming a default start location as 'LUMS'
      end_location: end_location,
      fare: fare,
    });
    await Driver.updateOne({ _id: driver_id }, { available: 0 });

    // Send a response indicating successful ride setup
    res.status(200).json({
      success: true,
      message: 'Ride setup successful.',
      ride_id: ride_id,
      driver_id: driver_id,
      ride: newRide,
    })
  } catch (error) {
    // Handle errors
    console.error('Error creating ride:', error);
    next(error);
  }
};

// AddRating

export const addRating = async (req, res, next) => {
  try {
    const { rating, rideData } = req.body;

    // const { ObjectId } = require('mongodb');
    // Log the received rating and rideData
    console.log('Received rating:', rating);
    // console.log('Received rideData:', rideData);
    const { ride_id, driver_id } = rideData; // Extract ride_id and driver_id from rideData
    
    const driverObjectId =new ObjectId(driver_id);
    console.log(ride_id)
    console.log( driverObjectId )
    // Delete the ride with the specified ride_id from the rides collection
    await Ride.findOneAndDelete({ ride_id });

    // Update the driver document to set 'available' to 1
    await Driver.findOneAndUpdate({  driverObjectId  }, { available: 1 });

    // Create a new 'rating' field in the Driver document with the received rating
    await Driver.findOneAndUpdate({  driverObjectId  }, { $set: { rating } });

    // Perform other operations with the rating data, like saving it to a database

    // Send a response indicating successful rating addition
    res.status(200).json({ success: true, message: 'Rating added successfully.' });
  } catch (error) {
    // Handle errors
    console.error('Error adding rating:', error);
    next(error);
  }
};




//Profile
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};


//Logout
export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};