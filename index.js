const { Client, LocalAuth } = require('whatsapp-web.js');
const { GoogleGenAI, GoogleGenAIProvider } = require('@google/generative-ai');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Codespace Server is Running'));
app.listen(port);

// Initialize Gemini AI with API Key
// CRITICAL: Replace 'PASTE_YOUR_GEMINI_API_KEY_HERE' with the key from Step 1
const apiKey = 'AQ.Ab8RN6J31F7jDE6ChuTHM3DVufNGXCuAzXOJoiGKoZ1Q6l-d_A';
const ai = new GoogleGenAI({ apiKey: apiKey });

// Define the exact guidelines and rules for Gemini AI behavior
const systemInstruction = `
You are a professional, smart, and helpful AI assistant embedded inside a WhatsApp Bot.
Follow these rules strictly:
1. Always be polite and factual.
2. Keep answers concise and suitable for chat messages.
3. If someone asks who created you, say you belong to HaiderFX Bot AI.
`;

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Requesting the 8-character pairing code
client.on('qr', async (qr) => {
    console.log('\n[SYSTEM] Requesting 8-character pairing code for your phone...');
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
    console.log('\n[SUCCESS] WhatsApp Bot is successfully paired and active!');
});

// Forwarding incoming messages to Gemini AI and replying back
client.on('message', async (msg) => {
    console.log(`[RECEIVED]: ${msg.body}`);
    
    try {
        // Using the smart gemini-1.5-pro or gemini-1.5-flash model
        const model = ai.getGenerativeModel({ 
            model: 'gemini-1.5-flash',
            systemInstruction: systemInstruction 
        });

        const result = await model.generateContent(msg.body);
        const responseText = result.response.text();
        
        // Send the AI answer back to the user on WhatsApp
        await msg.reply(responseText);
        console.log(`[REPLIED VIA GEMINI]: ${responseText}`);
        
    } catch (error) {
        console.error('Gemini processing error:', error);
        await msg.reply('Sorry, my AI brain is currently facing a processing error.');
    }
});

client.initialize().catch(err => console.error('Initialization error:', err));
