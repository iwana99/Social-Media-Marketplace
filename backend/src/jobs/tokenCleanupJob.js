import cron from 'node-cron'
import { tokenCleanupService } from '../services/tokenCleanupService.js';
export const tokenCleanupJob=()=>{
 cron.schedule('0 3 * * *', async () => {
    console.log('Running token cleanup job...');
    try {
        await tokenCleanupService();
    }
    catch (error) {
        console.error('Error running token cleanup job:', error);
    }

 },
 { scheduled: true, timezone: 'Europe/Belgrade',
    noOverlap:true
  }
)
};