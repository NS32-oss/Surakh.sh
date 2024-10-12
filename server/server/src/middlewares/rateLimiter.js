// server/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";
import winston from "winston";

// Create a logger using winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()  // Logs as JSON, can be changed to winston.format.simple() for plain text
  ),
  transports: [
    new winston.transports.File({ filename: 'malicious-activity.log' }) // Log file
  ]
});

// Middleware to log malicious activity
const logMaliciousActivity = (req) => {
  logger.info({
    message: "Rate limit exceeded",
    ip: req.ip,
    method: req.method,
    url: req.originalUrl,
    headers: req.headers
  });
};

export const createAccountLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10,
  message: {
    status: 429,
    error: "Too many accounts created from this IP, please try again after 15 minutes",
  },
  handler: (req, res, next, options) => {
    logMaliciousActivity(req); // Log the request details when rate limit is hit
    res.status(options.statusCode).json(options.message);
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});


export const generalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 50, 
  message: {
    status: 429,
    error: "Too many requests, please try again later",
  },
  handler: (req, res, next, options) => {
    logMaliciousActivity(req); // Log the request details when rate limit is hit
    res.status(options.statusCode).json(options.message);
  },
});
