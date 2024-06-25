import { google, oAuth2Client } from '../config/gmail';

async function getGmailMessages() {
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const res = await gmail.users.messages.list({ userId: 'me' });
    return res.data.messages || [];
}

export { getGmailMessages };
