import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  console.log("Cookie --")
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.json({
      success: true,
      message,
      name: user.name,
      token: token,
    });
};
