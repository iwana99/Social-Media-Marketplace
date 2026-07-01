import {Product} from "../models/product.model.js"

import { Category } from "../models/category.model.js"
import { z } from "zod"
import {getRedisClient} from "../../config/redis.js"

const productSchema= z.object({
    name: z.string().min(3),
    description: z.string().min(10),
    price: z.number().min(1),
    category: z.string(),
    stock: z.number().min(1)
})
export const getAllProducts = async (req, res,next) => {
try {
    const cacheKey=`products:${req.query.category||"all"}`  
    const redis=getRedisClient()
    if(redis){
        const cachedData=await redis.get(cacheKey)
        if(cachedData){
            return res.json(JSON.parse(cachedData))
        }
    }
    const filter={isActive:true}
    if(req.query.category){
        filter.category=req.query.category
    }
    const products=await Product.find(filter).sort({createdAt:-1}).limit(50)
    if(redis){
        await redis.set(cacheKey,JSON.stringify(products))
    }
    res.json(products)
   
} catch (error) {
    next(error)
}
}

export const createProduct = async (req, res,next) => {
    try {

        const input = productSchema.parse(req.body);
        const product = await Product.create(input);
        const redis = getRedisClient();
        if (redis) {
            await redis.del("products:all");
        }
        res.status(201).json(product);
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async()=>{
    try{
        const input = productSchema.partial().parse(req.body);
        const product = await Product.findByIdAndUpdate(req.params.id, input, { new: true });
        const redis = getRedisClient();
        if (redis) {
            await redis.del("products:all");
        }
        res.json(product);

    }
    catch (error) {
        next(error)
    }

}
export const deleteProduct = async()=>{
    try {
    await Product.findByIdAndUpdate(req.params.id,{isActive:false})
    const redis = getRedisClient();
    if (redis) {
        await redis.del("products:all");
    }
    res.status(204).send()
} catch (error) {
    next(error)
}
}
