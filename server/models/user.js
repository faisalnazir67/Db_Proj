import mongoose from "mongoose";


// Client Schema
const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Driver Schema
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  carName: {
    type: String,
    required: true,
  },
  licenseNumber: {
    type: String,
    required: true,
  },
  available: {
    type: Number,
    enum: [0, 1],
    default: 1, 
  },
  wallet:{
    type: Number,
    required: true,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// ride_schema
const rideSchema = new mongoose.Schema({
  ride_id: {
    type: String,
    required: true,
    unique: true,
  },
  driver_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true,
  },
  user_name: {
    type:String,
    ref: 'users',
    required: true,
  },
  start_location: {
    type: String,
    default: 'LUMS',
  },
  end_location: {
    type: String,
    required: true,
  },
  fare: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Ride = mongoose.model('Ride', rideSchema, 'rides');

export const Driver = mongoose.model("Driver", driverSchema, "Driver");

export const User = mongoose.model("User", schema , "users");