import mongoose from "mongoose";

let isConnected = false;

export const connectToDb = async()=>{
    mongoose.set('strictQuery' , true);

    if (isConnected) {
        return ;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'Share_prompt',
           // useNewUrlParser:true,
           // useUnifiedTopology:true,
        })
        isConnected = true;
    }catch(error){
        console.log(error);
    }

}