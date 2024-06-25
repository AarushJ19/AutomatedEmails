// app.ts

import express from 'express';
import { google } from 'googleapis';
import { Client } from '@microsoft/microsoft-graph-client';
import dotenv from 'dotenv';
import { fetchAccessToken, fetchEmails, categorizeEmail, generateResponse } from './emailFunctions'; // Functions to fetch emails, categorize, and respond
import { OpenAI } from './config/openai'; // Assuming OpenAI class is defined in openai.ts

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 3000;

// Google OAuth configuration
const googleAuth = new google.auth.OAuth2({
    clientId: process.env.GMAIL_CLIENT_ID!,
    clientSecret: process.env.GMAIL_CLIENT_SECRET!,
    redirectUri: process.env.GMAIL_REDIRECT_URL!, // Ensure this is configured in your Google Cloud Console
});

// Microsoft Graph API client configuration
const microsoftClient = Client.init({
    authProvider: async (done) => {
        const token = await fetchAccessToken(); // Implement this function to fetch access token
        done(null, token);
    },
});

// Initialize OpenAI client with configuration
const openaiConfig = {
    apiKey: process.env.OPENAI_API_KEY!,
};
const openai = new OpenAI(openaiConfig); // Initialize OpenAI with configuration

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.get('/authorize/google', (req, res) => {
    const url = googleAuth.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    });
    res.redirect(url);
});

app.get('/oauthcallback/google', async (req, res) => {
    const { code } = req.query;
    const { tokens } = await googleAuth.getToken(code as string);
    googleAuth.setCredentials(tokens);
    res.send('OAuth 2.0 authorization successful!');
});

app.get('/authorize/outlook', (req, res) => {
    const authUrl = `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/authorize?client_id=${process.env.OUTLOOK_CLIENT_ID}&response_type=code&redirect_uri=${process.env.OUTLOOK_REDIRECT_URI}&response_mode=query&scope=offline_access%20user.read%20mail.read%20mail.readwrite%20mail.send`;
    res.redirect(authUrl);
});

app.get('/oauthcallback/outlook', async (req, res) => {
    const { code } = req.query;
    const tokenEndpoint = `https://login.microsoftonline.com/${process.env.OUTLOOK_TENANT_ID}/oauth2/v2.0/token`;
    const authResponse = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `client_id=${process.env.OUTLOOK_CLIENT_ID}&scope=offline_access%20user.read%20mail.read%20mail.readwrite%20mail.send&redirect_uri=${process.env.OUTLOOK_REDIRECT_URI}&grant_type=authorization_code&code=${code}&client_secret=${process.env.OUTLOOK_CLIENT_SECRET}`,
    });
    const authTokens = await authResponse.json();
    // Save tokens securely or use them for API calls
    res.send('OAuth 2.0 authorization successful!');
});

// Example route to fetch and categorize emails
app.get('/fetch-emails', async (req, res) => {
    try {
        const emails = await fetchEmails(googleAuth, microsoftClient); // Implement this function
        const categorizedEmails = categorizeEmail(emails, openai); // Implement this function
        res.json(categorizedEmails);
    } catch (error) {
        console.error('Error fetching or categorizing emails:', error);
        res.status(500).json({ error: 'Failed to fetch or categorize emails' });
    }
});

// Start Express server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
