const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenAI } = require('@google/generative-ai');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('WhatsApp Bot Server is Active!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// We connect to a public WebSocket browser connection to completely bypass Render's local environment limitations
const client = new Client({
    puppeteer: {
        browserWSEndpoint: 'wss://chrome.browserless.io/',
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage'
        ]
    }
});

client.on('qr', (qr) => {
    console.log('=== QR CODE START ===');
    console.log('Scan the QR code below via WhatsApp Web:');
    qrcode.generate(qr, { small: true });
    console.log('=== QR CODE END ===');
});

client.on('ready', () => {
    console.log('Success: WhatsApp Client is successfully connected!');
});

client.on('message', async (msg) => {
    if (msg.body.startsWith('!ai ')) {
        const userPrompt = msg.body.slice(4);
        try {
            msg.reply(`Gemini Response Placeholder for: ${userPrompt}`);
        } catch (error) {
            console.error(error);
            msg.reply('Error connecting to AI system.');
        }
    }
});

client.initialize().catch(err => {
    console.error('Initialization error details:', err);
});
