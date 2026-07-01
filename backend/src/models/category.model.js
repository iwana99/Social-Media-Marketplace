import mongoose from 'mongoose'

const categorySchema= new mongoose.Schema({
    name:{type:String,unique:true,require:true}
},{timestamps:true})

export const Category=mongoose.models.Category || mongoose.model("Category",categorySchema)