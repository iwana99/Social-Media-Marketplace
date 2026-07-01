import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        index:true
    },
    passwordHash:{
        type:String,
        required:true
    },
    role:{type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

userSchema.statics.hashPassword= function hashPassword(password){
    return bcrypt.hash(password,12);

}
userSchema.methods.comparePassword= function comparePassword(password){
    return bcrypt.compare(password,this.passwordHash);
}

export const User=mongoose.models.User || mongoose.model("User", userSchema);
  