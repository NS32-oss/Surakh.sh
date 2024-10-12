import asyncHandler from "../utils/asyncHandler.js";
import apiError from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import passport from 'passport';
import apiResponse from "../utils/apiResponse.js";
import sanitizeInput from "../utils/sanitizer.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (err) {
    console.log(err);
    throw new apiError(500, "Error in generating token");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  // console.log(" Email: ", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new apiError(400, "All Fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existedUser) {
    throw new apiError(409, "User Already Exist");
  }
  // console.log("files : ");
  // console.log(req.files);
  
  const user = await User.create({
    fullName,
    email,
    username,
    password,
   
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new apiError(500, "Error in creating user");
  }
  //generate secretKey for the user new user so that he can use it for authentication everytime he makes a request for anything making our security stronger http://localhost:5000/api/v1/generateSecretKey
  // const response=fetch("http://localhost:5000/api/v1/generateSecretKey", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${accessToken}`,
  //   },
  //   body: JSON.stringify({ projectName: "User" }),
  // });

  // const data=await response.json(); 

  
  // return new apiResponse(200, "User registered successfully", createdUser);
  return res
    .status(201)
    .json(new apiResponse(201, "User registered successfully", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { usernameOrEmail, password } = req.body;

  // Input sanitization
  const sanitizedUsernameOrEmail = sanitizeInput(usernameOrEmail);
  const sanitizedPassword = sanitizeInput(password);

  if (sanitizedUsernameOrEmail !== usernameOrEmail) {
    throw new apiError(400,"Potential XSS or SQL Injection detected in usernameOrEmail");
  }
  if (sanitizedPassword !== password) {
    throw new apiError(400,"Potential XSS or SQL Injection detected in password");
  }

  if (!sanitizedUsernameOrEmail) {
    throw new apiError(400, "Username or Email is required");
  }
  if (!sanitizedPassword) {
    throw new apiError(400, "Password is required");
  }

  const user = await User.findOne({
    $or: [{ email: sanitizedUsernameOrEmail }, { username: sanitizedUsernameOrEmail }],
  });

  if (!user) {
    throw new apiError(404, "User not found");
  }

  const isMatch = await user.isPasswordMatch(sanitizedPassword);
  if (!isMatch) {
    throw new apiError(401, "Invalid Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    path: "/",
  };

  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", refreshToken, options);

  return res.status(200).json(
    new apiResponse(200, "User logged in successfully", {
      user: loggedInUser,
      refreshToken,
      accessToken,
    })
  );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: "" });
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new apiResponse(200, "User logged out successfully", {}));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if ([currentPassword, newPassword].some((field) => field?.trim() === "")) {
    throw new apiError(400, "All Fields is required");
  }

  const user = await User.findById(req.user._id);
  if (!user) {
    throw new apiError(404, "User not found");
  }
  const isMatch = await user.isPasswordMatch(currentPassword);
  if (!isMatch) {
    throw new apiError(401, "Invalid Password");
  }

  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new apiResponse(200, "Password changed successfully", {}));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  const userID = req.user._id;
  if (!userID) {
    throw new apiError(400, "User ID is required");
  }
  const user = await User.findById(userID).select("-password -refreshToken");
  if (!user) {
    throw new apiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new apiResponse(200, "User fetched successfully", user));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email, username } = req.body;
  // if ([fullName, email, username].some((field) => field?.trim() === "")) {
  //   throw new apiError(400, "All Fields is required");
  // }
  //check if the user exists with the same email or username
  const existingUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (existingUser) {
    throw new apiError(
      409,
      "User already exists with the same email or username"
    );
  }

  const objectField = {};
  if (fullName) objectField.fullName = fullName;
  if (email) objectField.email = email;
  if (username) objectField.username = username;
  const user = await User.findByIdAndUpdate(req.user._id, objectField, {
    new: true,
  }).select("-password -refreshToken");
  return res
    .status(200)
    .json(new apiResponse(200, "User updated successfully", user));
});


//refresh access token
const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new apiError(401, "Refresh token is missing");
  }
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new apiError(404, "User not found");
  }
  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessAndRefreshToken(user._id);
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  res.cookie("accessToken", accessToken, options);
  res.cookie("refreshToken", newRefreshToken, options);
  return res.status(200).json(
    new apiResponse(200, "Access token refreshed successfully", {
      user: loggedInUser,
      refreshToken: newRefreshToken,
      accessToken,
    })
  );
});


const googleAuth = (req, res, next) => {
  var { redirect_url } = req.query;

  // Whitelist validation: Make sure this URL is from an authorized developer
  const whitelistedRedirects = [
    'http://frontend1.com/dashboard',
    'http://frontend2.com/callback',
    `http://localhost:5000/login-success`,
    `http://localhost:5000/auth/google/callback`,
    // Add more authorized redirect URLs
  ];


  if (!whitelistedRedirects.includes(redirect_url)) {
    redirect_url = `http://localhost:5000/login-success`;
  }

  // Pass the redirect_url as part of the state parameter
  const state = JSON.stringify({ redirect_url });

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account',
    accessType: 'offline',
    state,  // Adding the redirect_url to the state
  })(req, res, next);
};


// OAuth Google Callback
const googleAuthCallback = asyncHandler(async (req, res, next) => {
  passport.authenticate('google', { session: false }, async (err, user, info) => {
    if (err || !user) {
      return res.status(400).json(new ApiResponse(400, 'Authentication failed', {}));
    }

    // Generate access and refresh tokens for the authenticated user
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

    // Set the accessToken and refreshToken cookies
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      path: '/',
    });

    // Retrieve the redirect_url from the state parameter
    const state = JSON.parse(req.query.state);
    const { redirect_url } = state;

    // Redirect the user to the developer's frontend URL
    res.redirect(redirect_url);
  })(req, res, next);
});
const googleRedirectAuth = asyncHandler(async (req, res) => {
  const redirectUrl = "https://score.swarjagdale.com";
  res.status(200).send(`

        <button onclick="window.open('${redirectUrl}', '_blank')">Authenticate with Google</button>
  
  `);
});


export {
  registerUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  getCurrentUser,
  googleRedirectAuth,
  updateAccountDetails,
 googleAuth,
 googleAuthCallback,  


  refreshAccessToken,

};




