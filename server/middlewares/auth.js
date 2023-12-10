// import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

import { User, Driver } from '../models/user.js';

export const isAuthenticated = async (req, res, next) => {
  try {
    // Check if there is a token in headers
    const token = req.headers.token;
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Login First',
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Determine the model based on the schema name
    const modelName = decoded.constructor.modelName;
    let user;

    if (modelName === 'User') {
      user = await User.findById(decoded._id);
    } else if (modelName === 'Driver') {
      user = await Driver.findById(decoded._id);
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user type',
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error during authentication:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
