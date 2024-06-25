import { getGmailMessages } from './gmailService';
import { getOutlookMessages } from './outlookService';

async function parseEmails() {
    const gmailMessages = await getGmailMessages();
    const outlookMessages = await getOutlookMessages();

    return [...gmailMessages, ...outlookMessages];
}

export { parseEmails };
