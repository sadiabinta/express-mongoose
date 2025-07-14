import dotenv from "dotenv";
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

dotenv.config();
let server: Server;
const PORT = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI!;

if (!process.env.MONGODB_URI) {
  throw new Error("MONGODB_URI not defined in .env");
}
async function main() {
  try {
    await mongoose.connect(uri);
    // await mongoose.connect(
    //   "mongodb+srv://mongodb:mongodb@cluster0.gwkhwjr.mongodb.net/Library-Management-System?retryWrites=true&w=majority&appName=Cluster0"
    // );
    server = app.listen(PORT, () => {
      console.log(`App is listening to PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
