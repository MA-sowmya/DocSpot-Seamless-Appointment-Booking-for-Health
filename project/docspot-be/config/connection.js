const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//conecting to mongodb
const connectDB=(req,res) =>{
   const connect = mongoose.connect(process.env.MONGO_URL);
   try {
    if(connect){
        console.log("Connected To MONGODB");
    }
   } catch (error) {
    console.log(error,"Connection Error");
   }
}

//exporting 
module.exports = connectDB;