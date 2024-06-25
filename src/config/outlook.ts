import { ConfidentialClientApplication } from '@azure/msal-node';

const OUTLOOK_CLIENT_ID = process.env.OUTLOOK_CLIENT_ID;
const OUTLOOK_CLIENT_SECRET = process.env.OUTLOOK_CLIENT_SECRET;
const OUTLOOK_TENANT_ID = process.env.OUTLOOK_TENANT_ID;

if (!OUTLOOK_CLIENT_ID || !OUTLOOK_CLIENT_SECRET || !OUTLOOK_TENANT_ID) {
    throw new Error('Missing required Outlook environment variables');
}

const cca = new ConfidentialClientApplication({
    auth: {
        clientId: OUTLOOK_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${OUTLOOK_TENANT_ID}`,
        clientSecret: OUTLOOK_CLIENT_SECRET
    }
});

export { cca };
