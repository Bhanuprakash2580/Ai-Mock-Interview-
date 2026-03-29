// ============================================
// db.config.js - MongoDB Connection
// ============================================
// Connects to MongoDB Atlas using Mongoose.
// Reference: mongoose.connect() - reference-mongodb.md
// ============================================

import mongoose from 'mongoose';

let connectionPromise = null;

const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    }

    if (connectionPromise) {
      return connectionPromise;
    }

    // Get the connection string from environment variables
    const mongoURI = process.env.MONGODB_URI;

    // Safety check: make sure the URI exists
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in your .env file');
    }

    // Connect to MongoDB
    // Mongoose 9.x handles connection options automatically
    connectionPromise = mongoose.connect(mongoURI);
    const conn = await connectionPromise;

    console.error(`MongoDB Connected: ${conn.connection.host}`);
    return conn.connection;
  } catch (error) {
    connectionPromise = null;
    console.error(`MongoDB Connection Error: ${error.message}`);
    throw error;
  }
};

export default connectDB;
