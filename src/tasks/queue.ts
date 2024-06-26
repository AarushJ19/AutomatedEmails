import { Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { sendEmail } from '../utils/emailSender';

const redisOptions = {
  host: 'localhost',
  port: 6379, // Ensure port is a number
  maxRetriesPerRequest: null,
};

const connection = new IORedis(redisOptions);

const emailQueue = new Queue('emailQueue', { connection });

const emailWorker = new Worker(
  'emailQueue',
  async (job) => {
    console.log(`Processing job ${job.id}...`);
    const { to, subject, body } = job.data;
    await sendEmail(to, subject, body);
    console.log(`Email sent to ${to}`);
  },
  { connection }
);

export { emailQueue, emailWorker };
