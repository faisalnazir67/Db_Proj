import jwt from "jsonwebtoken";

export const sendCookie = (user, res, message, statusCode = 200) => {
  console.log("Cookie --")
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // Cookie expiration time (15 minutes)
      sameSite: 'strict',
      secure: true,
    })
    .json({
      success: true,
      message,
      name: user.name,
    });
};
