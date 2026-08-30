/*
Readable replacement entrypoint for Phoenix-MD-Bot
This file replaces the obfuscated index.js with a clear, maintainable startup sequence.
It initializes environment, loads config, and starts the WhatsApp connection implemented in lib/whatsapp.js.

Notes:
- Original obfuscated files are preserved by reference in backup/ORIGINAL_FILES.md in this branch.
- This change intentionally avoids using the deprecated printQRInTerminal option and handles QR via connection.update.
*/

require('dotenv').config();

const config = require('./config');
const path = require('path');
const fs = require('fs');

// Start the WhatsApp connection implementation (lib/whatsapp.js)
const startWhatsApp = require('./lib/whatsapp');

async function main() {
  try {
    console.log('\nStarting Phoenix-MD Bot (readable index)...');

    // Ensure storage directory exists for auth/session
    const authDir = path.resolve('./auth_info');
    if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

    const sock = await startWhatsApp({ config, authDir });

    // sock is a Baileys socket instance. You can attach additional handlers here if needed.
    sock.ev.on('connection.update', (update) => {
      console.log('connection.update', update.connection || (update.qr ? 'qr' : 'update'));
    });

    sock.ev.on('creds.update', () => {
      // creds update handled inside whatsapp module; this is just informational
      console.log('credentials updated');
    });

  } catch (err) {
    console.error('Failed to start bot:', err);
    process.exit(1);
  }
}

main();
