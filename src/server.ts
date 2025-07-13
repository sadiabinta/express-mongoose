import dotenv from "dotenv";
dotenv.config();
import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server: Server;
const PORT = 5000;

async function main() {
  try {
    const uri = process.env.MONGODB_URI!;
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
