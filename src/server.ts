import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

let server:Server;
const PORT=5000;

async function main(){
    try{
        await mongoose.connect('mongodb+srv://mongodb:mongodb@cluster0.gwkhwjr.mongodb.net/Library-Management-System?retryWrites=true&w=majority&appName=Cluster0')
        server=app.listen(PORT,()=>{
            console.log(`App is listening to PORT ${PORT}`);
        })
        
    }catch(error){
        console.log(error);
    }
}

main();