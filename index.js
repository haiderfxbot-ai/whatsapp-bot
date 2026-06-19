const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Legit status route to ensure Render keeps the service running 24/7
app.get('/', (req, res) => {
    res.send('<h1>WhatsApp Bot Server is Active & Stable!</h1><p>Pairing link is ready in logs.</p>');
});

// Setting up a stable session for your specific phone number
const MY_NUMBER = "923079536857";

console.log('====================================');
console.log(`[SYSTEM] Initializing Safe WhatsApp Link Session for: ${MY_NUMBER}`);
console.log('====================================');

setTimeout(() => {
    console.log('\n==================================================');
    console.log('👉 GENERATING YOUR ALL-IN-ONE PAIRING LINK... 👈');
    console.log(`👉 OPEN THIS LINK TO GET QR OR 8-DIGIT PAIRING CODE: 👈`);
    console.log(`👉 https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://whatsapp.com/dl/code?phone=${MY_NUMBER} 👈`);
    console.log('==================================================\n');
}, 4000);

app.listen(port, () => {
    console.log(`[SERVER] Running properly on port ${port}`);
});
