import mongoose from "mongoose";
import { Category } from "./category.model.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        required: true,
        
    },
   isActive:{
    type:Boolean,
    default:true,
    index:true
   },
   category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:Category,
    index:true

   },
   stock:{
    type:Number,
    default:0,
    required:true,
    min:0
   }
},{timestamps:true});

productSchema.index({name:"text",category:"text",description:"text"});

export const Product =mongoose.models.Product || mongoose.model("Product", productSchema);