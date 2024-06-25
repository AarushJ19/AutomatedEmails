import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const { GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, REDIRECT_URL } = process.env;

const oAuth2Client = new google.auth.OAuth2(GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, REDIRECT_URL);

export { oAuth2Client, google };
