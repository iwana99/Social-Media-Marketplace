import express from 'express';
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";
import { errorHandler } from './middleware/errorHandler.js';

import { authRouter } from './routes/auth.route.js';
import {ProductRoute} from './routes/product.route.js';
import dotenv from "dotenv";

dotenv.config();
export const app=express();


app.use(helmet());
app.use(cors({origin: process.env.CLIENT_URL,credentials: true}));
app.use(express.json({limit: '1mb'}));


app.use(cookieParser());

app.use("/api/auth",rateLimit({windowMs: 15 * 60 * 1000,max:100 })); //moze da se uloguje 100 puta u 15 minuta, posle toga ce da blokira
app.use("/api/product",ProductRoute);


app.get('/health',(req,res)=>{
    res.json({status:'ok',service:"MERN SHOP"})
});

app.use("/api/auth",authRouter);
app.use(errorHandler);