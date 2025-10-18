import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully.');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    console.log('Server will continue running without MongoDB connection.');
    // Don't exit the process, allow server to run without DB
  }
};

export default connectDB; 