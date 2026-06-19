const express = require('express');
const { default: makeWASocket, useMultiFileAuthState } = require('baileys');

const app = express();
const port = process.env.PORT || 5000; // Complete secure non-conflicting port

app.get('/', (req, res) => {
    res.send('<h1>WhatsApp Stable Bot Core is Live!</h1>');
});

app.listen(port, () => {
    console.log(`[SERVER] Listening perfectly on port ${port}`);
});

async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_session');
    
    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: false // We explicitly disable QR to force text pairing code
    });

    sock.ev.on('creds.update', saveCreds);

    if (!sock.authState.creds.registered) {
        setTimeout(async () => {
            try {
                const myPhoneNumber = "923079536857";
                console.log(`\n[SYSTEM] Requesting official pairing code for: ${myPhoneNumber}`);
                
                const code = await sock.requestPairingCode(myPhoneNumber);
                
                console.log('\n==================================================');
                console.log(`👉 SUCCESS! YOUR WHATSAPP PAIRING CODE IS: ${code} 👈`);
                console.log('==================================================\n');
            } catch (error) {
                console.error('Pairing registration failed:', error);
            }
        }, 3000);
    }

    sock.ev.on('connection.update', (update) => {
        const { connection } = update;
        if (connection === 'close') {
            console.log('[SYSTEM] Connection closed, restarting...');
            connectToWhatsApp();
        } else if (connection === 'open') {
            console.log('\n[SUCCESS] WhatsApp Bot is successfully authenticated and active!');
        }
    });
}

connectToWhatsApp().catch(err => console.error('Main engine failure:', err));
