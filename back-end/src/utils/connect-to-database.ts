import mongoose from "mongoose";

export default async function connectToDatabase() {
  try {
    const connect = await mongoose.connect(process.env.DB_URI as string);
    console.log(
      `Connected to DB ${connect.connection.host} ${connect.connection.name}`,
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
