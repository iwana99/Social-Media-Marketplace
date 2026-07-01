import mongoose from "mongoose";
import {User} from "./user.model.js";

const refreshTokenSchema= new mongoose.Schema(
    {
        user: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
            index:true
        },
        tokenHash:{
            type:String,
            required:true,
            unique:true
        },
        revokedAt:{
            type:Date,
            default:null
        },
        expiresAt:{
            type:Date,
            required:true,
            index:true
        }
        
    },
    {timestamps:true}
)

export const RefreshToken =
  mongoose.models.RefreshToken ||
  mongoose.model("RefreshToken", refreshTokenSchema);