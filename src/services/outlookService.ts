import { cca } from '../config/outlook';
import { Client } from '@microsoft/microsoft-graph-client';

async function getOutlookMessages(token: string) {
    const client = Client.init({
        authProvider: (done) => {
            done(null, token);
        },
    });

    const res = await client.api('/me/messages').get();
    return res.value;
}

export { getOutlookMessages };
