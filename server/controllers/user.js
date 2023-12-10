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
    console.log("Getting driver data")
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

//GEt Driver Wallet

export const getDriverWallet = async (req, res, next) => {
  try {
    const { driverName } = req.body; // Retrieve driver's name from the request body

    // Find the driver by name and select the wallet field
    const driver = await Driver.findOne({ name: driverName }).select('wallet');

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      walletBalance: driver.wallet,
    });
  } catch (error) {
    next(error);
  }
};

// Set Driver Availability
export const setDriverAvailability = async (req, res, next) => {
  try {
    const { driverName, availability } = req.body;

    // Map the availability status to the corresponding database value (1 or 0)
    const availabilityValue = availability === 'Available' ? 1 : 0;

    // Find the driver by name and update the availability field
    const updatedDriver = await Driver.findOneAndUpdate(
      { name: driverName },
      { available: availabilityValue },
      { new: true } // To return the updated driver data
    );

    if (!updatedDriver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    res.status(200).json({
      success: true,
      message: `Driver availability updated to ${availability}`,
      updatedDriver,
    });
  } catch (error) {
    next(error);
  }
};


//Ending Ride From Driver Side
export const endRide = async (req, res, next) => {
  try {
    const { driverName } = req.body; // Retrieve driver's name from the request body

    // Find the driver by name to get driver_id
    const driver = await Driver.findOne({ name: driverName });

    if (!driver) {
      return res.status(404).json({ success: false, message: 'Driver not found' });
    }

    const driverId = driver._id; // Retrieve the driver's _id

    console.log(driverId)

    // Check if the driver_id exists in the rides database
    const ride = await Ride.findOne({ driver_id: driverId });
    
    console.log(ride)
    if (!ride) {
      return res.status(404).json({ success: false, message: 'Ride not found for this driver' });
    }

    // Delete the ride document from the rides database
    await Ride.findOneAndDelete({ driver_id: driverId });
    console.log("deleted Ride")
    // Update driver's availability to 1 (Available)
    await Driver.findOneAndUpdate({ _id: driverId }, { available: 1 });
    console.log("Updated Driver")
    res.status(200).json({ success: true, message: 'Ride ended successfully' });
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
    
    // const driverObjectId =new ObjectId(driver_id);
    console.log(ride_id)
    console.log( driver_id )
    
    await Ride.findOneAndDelete({ ride_id });

    await Driver.findOneAndUpdate({  driver_id }, { available: 1 });

    await Driver.findOneAndUpdate({  driver_id  }, { $set: { rating } });

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