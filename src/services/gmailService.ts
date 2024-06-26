import { google, oAuth2Client } from "../config/gmail";

async function getToken(code: string) {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
    console.log("Access Token:", tokens);
  } catch (error) {
    console.error("Error obtaining access token:", error);
  }
}

async function getGmailMessages() {
  try {
    const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
    const res = await gmail.users.messages.list({ userId: "me" });
    return res.data.messages || [];
  } catch (error) {
    console.error("Error listing messages:", error);
    return [];
  }
}

export { getGmailMessages, getToken };
