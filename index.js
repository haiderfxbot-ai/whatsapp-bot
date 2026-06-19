const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { GoogleGenAI } = require('@google/generative-ai');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

// Express server to keep Render service alive
app.get('/', (req, res) => {
    res.send('WhatsApp Bot is running perfectly!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

// Initialize WhatsApp Client with specific arguments for Render/Linux environment
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// Generate QR Code in terminal for scanning
client.on('qr', (qr) => {
    console.log('SCAN THIS QR CODE WITH WHATSAPP:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready and connected!');
});

// Handle incoming messages
client.on('message', async (msg) => {
    if (msg.body.startsWith('!ai ')) {
        const userPrompt = msg.body.slice(4);
        try {
            // Placeholder for Gemini AI integration
            msg.reply(`Received prompt for Gemini: ${userPrompt}`);
        } catch (error) {
            console.error(error);
            msg.reply('Sorry, something went wrong with AI response.');
        }
    }
});

client.initialize();
