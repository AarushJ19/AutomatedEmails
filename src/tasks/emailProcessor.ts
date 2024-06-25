import { parseEmails } from '../services/emailParser';
import { respondToEmails } from '../services/emailResponder';
import { emailQueue } from './queue';

async function processEmails() {
    const emails = await parseEmails();
    emails.forEach(email => {
        emailQueue.add('processEmail', { email });
    });
}

export { processEmails };
