const { default: mongoose } = require("mongoose");

let connection = false;

export const connectToDb = async ()=>{
    try {
        if(connection){
            console.log("using existing connection")
            return
        }
        await mongoose.connect(process.env.MONGO);
        connection = true;
        console.log("connected To Mongo Db")
      } catch (error) {
        console.log(error);
      }
}