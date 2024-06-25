import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis();

const emailQueue = new Queue('emailQueue', { connection });

const emailWorker = new Worker('emailQueue', async job => {
    console.log(`Processing job ${job.id}...`);
    // Implement email processing logic here
}, { connection });

export { emailQueue };
