import nodemailer from "nodemailer";
import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import logger from "../utils/logger.js";
const otpStore = {};
const requestInterval = 60 * 1000; // 60 seconds

const sendOtp = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new apiError(400, "Email is required");
  }

  // const user = await User.findOne({ email });

  // if (!user) {
  //   logger.error(`OTP request failed: User not found for email: ${email}`);
  //   throw new apiError(404, "User not found");
  // }

  // Check if the user has already requested an OTP recently
  const existingEntry = otpStore[email];
  const currentTime = Date.now();

  if (existingEntry) {
    if (
      existingEntry.lastRequested &&
      currentTime - existingEntry.lastRequested < requestInterval
    ) {
        logger.warn(`Too many OTP requests for email: ${email}`);
      throw new apiError(429, "Too many OTP requests. Please try again later.");
    }
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP for password reset",
    text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

    // Store OTP with expiration time and update last requested time
    otpStore[email] = {
      otp,
      expires: Date.now() + 10 * 60 * 1000, // 10 minutes from now
      lastRequested: Date.now(), // Update last requested time
    };

    return res.json(new apiResponse(200, "OTP sent successfully"));
  } catch (error) {
    console.error("Error sending email:", error);
    throw new apiError(500, "Error sending OTP");
  }
});

const checkOtp = asyncHandler(async (req, res) => {
  const { email, otp } = req.body;

  const entry = otpStore[email];

  if (!entry) {
    throw new apiError(400, "OTP not found or has expired");
  }

  // Check if OTP is valid and not expired
  if (entry.otp === otp && entry.expires > Date.now()) {
    delete otpStore[email]; // Remove OTP after verification
    return res.json(new apiResponse(200, "OTP verified successfully"));
  }

  throw new apiError(400, "Invalid or expired OTP");
});

export { sendOtp, checkOtp };
