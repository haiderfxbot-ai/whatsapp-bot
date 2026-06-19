const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('WhatsApp Bot Server is Active!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
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

client.on('qr', (qr) => {
    console.log('=== COPY AND SCAN THIS QR CODE ===');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Success: WhatsApp Client is successfully connected!');
});

client.initialize().catch(err => {
    console.error('Initialization error:', err);
});
