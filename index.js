const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>WhatsApp Bot Server is Running Legally via Docker!</h1>');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

client.on('qr', async (qr) => {
    console.log('[SYSTEM] Requesting official 8-character pairing code...');
    try {
        const myPhoneNumber = '923079536857'; 
        const pairingCode = await client.requestPairingCode(myPhoneNumber);
        
        console.log('\n==================================================');
        console.log(`👉 YOUR WHATSAPP PAIRING CODE IS: ${pairingCode} 👈`);
        console.log('==================================================\n');
    } catch (err) {
        console.error('Error fetching pairing code:', err);
    }
});

client.on('ready', () => {
    console.log('Success: WhatsApp Bot is paired and ready!');
});

client.initialize().catch(err => {
    console.error('Initialization error:', err);
});
