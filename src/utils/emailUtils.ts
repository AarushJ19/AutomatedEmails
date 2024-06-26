import { google, oAuth2Client } from "../config/gmail";
import { cca } from "../config/outlook";
import { Client } from "@microsoft/microsoft-graph-client";

async function sendGmailReply(emailId: string, message: string) {
  const gmail = google.gmail({ version: "v1", auth: oAuth2Client });
  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw: Buffer.from(message).toString("base64"),
      threadId: emailId,
    },
  });
}

async function sendOutlookReply(emailId: string, message: string) {
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });

  if (!authResult || !authResult.accessToken) {
    throw new Error("Failed to acquire Outlook access token");
  }
  const token = authResult.accessToken;
  const client = Client.init({
    authProvider: (done) => {
      done(null, token);
    },
  });

  await client.api(`/me/messages/${emailId}/reply`).post({
    message: {
      body: {
        content: message,
        contentType: "Text",
      },
    },
  });
}

export { sendGmailReply, sendOutlookReply };
