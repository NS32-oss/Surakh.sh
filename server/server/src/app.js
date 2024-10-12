import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import helmet from "helmet";
import morgan from "morgan";
import userRouter from "./routes/user.router.js";
import { googleAuthCallback } from "./controllers/user.controller.js";
import passportConfig from "./config/passport.js";
import passport from "passport";
import session from "express-session";
import otpRouter from "./routes/otp.router.js";
import apiRouter from "./routes/api.router.js";
import endpointRouter from "./routes/endpoints.router.js";
import { checkKey } from "./controllers/api.controller.js";
dotenv.config();

const app = express();

const allowedOrigins = [
  "http://127.0.0.1:5500",
  "http://127.0.0.1:5501",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://localhost:3001  ",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin) || origin === "null") {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
  next();
});

app.use(helmet());
app.use(morgan("combined"));
app.use(generalLimiter);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
//



app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "Strict" : "Lax",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// app.use('/api/users', userRoutes);

// CSRF Token Endpoint (Move out of /api)
app.get("/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/auth/google/callback", googleAuthCallback);

app.use("/api/v1", apiRouter);
app.use("/login-success", (req, res) => {
  res.send(`  
  <h1>Login Successful</h1>
  <p>You can now close this window and return to the application.</p>
  </body>
  <script>
  setTimeout(() => {
    window.close();
  }, 3000);

  document.cookie = 'securesignin=true;max-age=86400;secure;samesite=strict';


  </script>

  `);
});
// app.use((req, res, next) => {
//   const apiKey = req.headers['x-api-key'];

//   if (!apiKey) {
//       return res.status(400).json({ error: 'Missing API key' });
//   }

//   if (!apiKey) {
//       return res.status(401).json({ error: 'Invalid API key' });
//   }

//     next();
// });
app.use("/api/v1/users", userRouter);
app.use("/api/v1/otp", otpRouter);

app.use("/api/v2", endpointRouter);





console.log(`App.js is running on port ${process.env.PORT}`);

export default app;
