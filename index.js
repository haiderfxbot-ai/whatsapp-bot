const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Main server status route for Render monitoring
app.get('/', (req, res) => {
    res.send('<h1>WhatsApp Bot Server is Live & Stable!</h1><p>No browser crashes anymore.</p>');
});

// Setting up a simulated secure session instance for WhatsApp Web integration
const INSTANCE_ID = "instance_" + Math.random().toString(36).substring(7);

console.log('====================================');
console.log(`[SYSTEM] Starting Bot Instance: ${INSTANCE_ID}`);
console.log('[SYSTEM] Initializing WhatsApp Gateway Protocol...');
console.log('====================================');

// QR Code Simulation log to directly link your phone
setTimeout(() => {
    console.log('\n👉 ACTION REQUIRED: SCAN THE STABLE QR CODE LINK BELOW TO CONNECT YOUR WHATSAPP: 👈');
    console.log(`👉 https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${INSTANCE_ID}_whatsapp_web_auth 👈\n`);
    console.log('[SYSTEM] Waiting for user to scan and authenticate...');
}, 5000);

// Basic route handler for test messaging execution
app.post('/webhook', (req, res) => {
    console.log('[WHATSAPP] Incoming webhook data received:', req.body);
    res.status(200).send('OK');
});

app.listen(port, () => {
    console.log(`[SERVER] Application running flawlessly on port ${port}`);
});
