import { analyzeEmailContent } from './openaiService';
import { sendGmailReply, sendOutlookReply } from '../utils/emailUtils';

async function respondToEmails(email: { snippet: any; bodyPreview: any; id: string; }) {
    const content = email.snippet || email.bodyPreview;
    const category = await analyzeEmailContent(content);

    if (category.includes('Interested')) {
        await sendGmailReply(email.id, 'Would you like to hop on a demo call?');
        await sendOutlookReply(email.id, 'Would you like to hop on a demo call?');
    } else if (category.includes('Not Interested')) {
        await sendGmailReply(email.id, 'Thank you for your time.');
        await sendOutlookReply(email.id, 'Thank you for your time.');
    } else if (category.includes('More information')) {
        await sendGmailReply(email.id, 'Can we schedule a demo call?');
        await sendOutlookReply(email.id, 'Can we schedule a demo call?');
    }
}

export { respondToEmails };
