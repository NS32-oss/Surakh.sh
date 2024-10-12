import 'dotenv/config'; 
import app from './app.js';
import mongoose from 'mongoose';
import { DB_NAME } from './constants.js';
import connectDB from './db/index.js';

connectDB()
  .then(() => {
    const port = process.env.PORT || 8001;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('MONGODB connection error:', error);
    process.exit(1);
  });
