import { getGmailMessages } from "./gmailService";
import { getOutlookMessages } from "./outlookService";
import { cca } from "../config/outlook";

async function parseEmails() {
  // const authResult = await cca.acquireTokenByClientCredential({
  //   scopes: ["https://graph.microsoft.com/.default"],
  // });

  // if (!authResult || !authResult.accessToken) {
  //   throw new Error("Failed to acquire Outlook access token");
  // }

  // const token = authResult.accessToken;

  const gmailMessages = await getGmailMessages();
  // const outlookMessages = await getOutlookMessages(token);

  return [...gmailMessages];
  // return [...gmailMessages, ...outlookMessages];
}

export { parseEmails };
