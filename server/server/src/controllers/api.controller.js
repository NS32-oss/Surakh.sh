// Generate API Key Endpoint
import crypto from "crypto";
import argon2 from 'argon2';
import { randomBytes } from 'crypto';
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import apiError from "../utils/apiError.js";
import apiResponse from "../utils/apiResponse.js";
import { Api } from "../models/api.model.js";
import { User } from "../models/user.model.js";


// Endpoint to generate and store a secret key using argon 2
const generateSecretKey = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    if (!userId) {
        throw new apiError(400, "User not logged in");
    }

    const user = await User.findById(userId);

    if (!user) {
        throw new apiError(404, "User not found");
    }

    // Generate a random secret key
    const secretKey = randomBytes(32).toString('hex');

    // Hash the secret key using argon2
    const hashedKey = await argon2.hash(secretKey);

    // Store the hashed secret key in the user document
    user.secretKey = hashedKey;

    await user.save();

    return res.json({ message: "Secret key generated successfully", secretKey });
});
// Endpoint to authenticate a provided secret key
const checkKey = asyncHandler(async (req, res) => {
    const { secretKey } = req.body;
    const userId = req.user._id;

    if (!userId || !secretKey) {
        return res.status(400).json({ message: "userId and secretKey are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided secret key with the stored hashed secret key
    const isMatch = await argon2.verify(user.secretKey, secretKey);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid secret key" });
    }

    
});

const authenticateSecretKey = asyncHandler(async (req, res) => {
    const { secretKey } = req.body;
    const userId = req.user._id;

    if (!userId || !secretKey) {
        return res.status(400).json({ message: "userId and secretKey are required" });
    }

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided secret key with the stored hashed secret key
    const isMatch = await argon2.verify(user.secretKey, secretKey);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid secret key" });
    }

    return res.json({ message: "Secret key is valid" });
});

export { generateSecretKey, authenticateSecretKey,checkKey };
