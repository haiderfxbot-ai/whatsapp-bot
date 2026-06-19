const { Client, LocalAuth } = require('whatsapp-web.js');
const { GoogleGenAI } = require('@google/generative-ai');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('<h1>WhatsApp + Gemini AI Server is Active!</h1>');
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

// Initialize WhatsApp Client
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

// Step 1: Handle Pairing Code Generation
client.on('qr', async (qr) => {
    console.log('[SYSTEM] Requesting 8-character pairing code for your phone...');
    try {
        // Hardcoded your number as requested
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
    console.log('Success: WhatsApp Bot is paired and successfully active!');
});

// Step 2: Handle Incoming Messages and send to Gemini AI
client.on('message', async (msg) => {
    // The bot will respond to every message (you can change this logic later)
    console.log(`[USER MESSAGE]: ${msg.body}`);
    
    try {
        // Placeholder text until we add your Gemini API Key in the next step
        const botRules = "You are a helpful AI assistant.";
        msg.reply(`[Gemini AI Thinking Process Done] Ready to process: ${msg.body}`);
        
    } catch (error) {
        console.error('Gemini Error:', error);
        msg.reply('Sorry, I am facing an issue connecting to my AI brain.');
    }
});

client.initialize().catch(err => {
    console.error('Initialization error:', err);
});
