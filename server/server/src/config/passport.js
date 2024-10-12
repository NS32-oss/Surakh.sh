// src/config/passport.js

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { User } from '../models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

// Serialize user into the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URI,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value.toLowerCase();
        let user = await User.findOne({ email });

        if (!user) {
          // If user does not exist, create a new one
          user = await User.create({
            fullName: profile.displayName,
            email,
            username: profile.emails[0].value.split('@')[0],
            password: Math.random().toString(36).slice(-8), // Random password
            // avatar: profile.photos[0].value,
          });
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// Facebook OAuth Strategy
// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: `${process.env.FRONTEND_URL}/auth/facebook/callback`,
//       profileFields: ['id', 'displayName', 'emails', 'photos'],
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         const email = profile.emails[0].value.toLowerCase();
//         let user = await User.findOne({ email });

//         if (!user) {
//           // If user does not exist, create a new one
//           user = await User.create({
//             fullName: profile.displayName,
//             email,
//             username: profile.emails[0].value.split('@')[0],
//             password: Math.random().toString(36).slice(-8), // Random password
//             // avatar: profile.photos[0].value,
//           });
//         }

//         done(null, user);
//       } catch (error) {
//         done(error, null);
//       }
//     }
//   )
// );

export default passport;
