
import {app} from '../src/app.js'
import dotenv from "dotenv";
import {connectDB} from "../config/db.js"
import {tokenCleanupJob} from '../src/jobs/tokenCleanupJob.js'
import {connectRedis} from "../config/redis.js"


dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    await connectDB(process.env.MONGO_URI);
    await connectRedis(process.env.REDIS_URL);
    tokenCleanupJob();
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
   
}
startServer().catch((error) => {
    console.error("Server failed to start",error);
    process.exit(1);
});



