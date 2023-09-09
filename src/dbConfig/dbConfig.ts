import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      ("Database Connected");
    });
    connection.on("error", () => {
      ("MongoDB Connection Error. Please make sure that MongoDB is running.");
      process.exit();
    });
  } catch (error) {
    "Something went wrong"(error);
  }
}
