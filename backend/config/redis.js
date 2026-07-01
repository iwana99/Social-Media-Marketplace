import {createClient} from "redis";
let redisClient;
export const connectRedis=async(url)=>{
    if (!url){
        console.error("Redis URL is not provided");
        return;
    }
    redisClient= createClient({url});
    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    await redisClient.connect();
    console.log("Redis connected");
    return redisClient;
    
}
export const getRedisClient=()=>{
    return redisClient;
}