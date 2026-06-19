const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('WhatsApp Server Active'));
app.listen(port);

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// This is the REAL and OFFICIAL way to get the 8-character pairing code in terminal
client.on('qr', async (qr) => {
    console.log('\n[SYSTEM] Requesting official 8-character pairing code from WhatsApp...');
    try {
        const myPhoneNumber = '923079536857'; 
        const pairingCode = await client.requestPairingCode(myPhoneNumber);
        
        console.log('\n==================================================');
        console.log(`👉 SUCCESS! YOUR WHATSAPP PAIRING CODE IS: ${pairingCode} 👈`);
        console.log('==================================================\n');
    } catch (err) {
        console.error('Error fetching pairing code:', err);
    }
});

client.on('ready', () => {
    console.log('\n[SUCCESS] WhatsApp Bot is paired and ready!');
});

client.initialize().catch(err => console.error('Initialization error:', err));
