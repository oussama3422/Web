import mongoose from "mongoose";


let isConnected = false;


export const connectToMongoDb = async ()=>{
    mongoose.set('strictQuery',true);
    mongoose.set('bufferCommands', false);

    if(isConnected){
        console.log("the MongoDB is already connected");
        return ;
    }else{
        await mongoose.connect(process.env.MONGODB_URI,{dbName:'share_prompt',useNewUrlParser: true})
        isConnected=true;
        console.log("MongoDB connected");
    }
    try{
     
    }catch(error){
        console.log(error)
    }
}