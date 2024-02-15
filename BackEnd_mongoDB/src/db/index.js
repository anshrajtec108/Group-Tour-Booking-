import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/TourMangement`
    );
    console.log(
      `\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (err) {
    console.log("Mongo_DB connection Failed", err);
    process.exit(1);
  }
};

export default connectDB;