import { ConfidentialClientApplication } from "@azure/msal-node";

const OUTLOOK_CLIENT_ID = "3bec75d8-1083-402b-a3f0-69a6ee822e4b";
const OUTLOOK_CLIENT_SECRET = "035a30a8-660d-45bc-b467-a0fd4698cc84";
const OUTLOOK_TENANT_ID = "f8cdef31-a31e-4b4a-93e4-5f571e91255a";

if (!OUTLOOK_CLIENT_ID || !OUTLOOK_CLIENT_SECRET || !OUTLOOK_TENANT_ID) {
  throw new Error("Missing required Outlook environment variables");
}

const cca = new ConfidentialClientApplication({
  auth: {
    clientId: '3bec75d8-1083-402b-a3f0-69a6ee822e4b',
    authority: `https://login.microsoftonline.com/${OUTLOOK_TENANT_ID}`,
    clientSecret: 'A188Q~Z0aipGE2UYCdQvuHJyHMbu76cX1D4qMb9u',
  },
});

export { cca };
