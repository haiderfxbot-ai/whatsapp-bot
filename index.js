const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('WhatsApp Bot Code Server is Running!');
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

// When QR is generated, we intercept it and request a text pairing code instead
client.on('qr', async (qr) => {
    console.log('[SYSTEM] QR intercepted. Requesting 8-character pairing code...');
    try {
        // CRITICAL: Replace '923079536857' with your actual WhatsApp number with country code (no + or 0)
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
    console.log('Success: WhatsApp Bot is paired and active!');
});

client.initialize().catch(err => {
    console.error('Initialization error:', err);
});
