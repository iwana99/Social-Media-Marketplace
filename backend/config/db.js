import {mongoose} from "mongoose";

export const connectDB=async(uri)=>{

    if(!uri) throw new Error("Mongo_Uri is missing");

    mongoose.set("strictQuery",true);

    await mongoose.connect(uri,
       { maxPoolSize: Number(process.env.MAX_POOL_SIZE||20),
        serverSelectionTimeoutMS: 5000
});
console.log("Connection is success!")
}