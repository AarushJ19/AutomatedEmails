import express from 'express';
import { oAuth2Client } from './config/gmail';
import { processEmails } from './tasks/emailProcessor';
import { emailQueue, emailWorker } from './tasks/queue'; // Initialize email worker

const app = express();
const PORT = 3000;

// Define a route to initiate OAuth2 authorization flow
app.get('/auth', (req, res) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
  });
  res.redirect(authorizeUrl);
});

// OAuth2 callback route to handle token exchange
app.get('/oauthcallback', async (req, res) => {
  const code = req.query.code as string;
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  // Store tokens securely and use them for API calls
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
  res.send('Authentication successful! You can close this tab.');
});

// Route to list messages and process emails
app.get('/listMessages', async (req, res) => {
  try {
    // Enqueue a job to process emails asynchronously
    await emailQueue.add('processEmailsJob', {});
    res.send('Email processing job added to the queue.');
  } catch (error) {
    console.error('Error adding email processing job:', error);
    res.status(500).send('Failed to add email processing job.');
  }
});

// Start the BullMQ worker to process jobs from the queue
emailWorker.on('completed', (job) => {
  console.log(`Job ${job.id} has been completed.`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
