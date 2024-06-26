import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";

const GMAIL_CLIENT_ID =
  "704095933064-jv01jv3gppe0d2r49bl7gkd3mlfnoc0t.apps.googleusercontent.com";
const GMAIL_CLIENT_SECRET = "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";
const REDIRECT_URL = "http://localhost:3000/oauthcallback";

const oAuth2Client = new google.auth.OAuth2(
  GMAIL_CLIENT_ID,
  GMAIL_CLIENT_SECRET,
  REDIRECT_URL
);

const SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: "offline",
  scope: SCOPES,
});

export { oAuth2Client, google };
