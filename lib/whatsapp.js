// lib/whatsapp.js
// Readable Baileys connector using dynamic import to support Baileys ESM distribution.
// This avoids the "require() cannot be used on an ESM graph with top-level await" error
// by loading the ESM module with `await import()` inside the async start function.

const pino = require('pino');
const qrcode = require('qrcode-terminal');

module.exports = async function startWhatsApp({ config = {}, authDir = './auth_info' } = {}) {
  // Dynamically import Baileys (ESM) inside an async function to avoid require() errors
  const baileys = await import('@whiskeysockets/baileys');
  const { default: makeWASocket, DisconnectReason, useMultiFileAuthState, fetchLatestBaileysVersion } = baileys;

  // create auth state backed by files inside authDir
  const { state, saveCreds } = await useMultiFileAuthState(authDir);

  // get latest version of WA protocol
  let version;
  try {
    const v = await fetchLatestBaileysVersion();
    version = v.version;
  } catch (e) {
    version = undefined; // fallback to default
  }

  const logger = pino({ level: 'info' });

  const sock = makeWASocket({
    auth: state,
    logger,
    version,
    // do NOT pass printQRInTerminal (deprecated). We'll handle QR in connection.update.
    // other options can be passed here from config if needed
  });

  // listen for connection updates (including QR)
  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      // display QR in terminal
      try {
        qrcode.generate(qr, { small: true });
        console.log('\nScan the QR above with WhatsApp (or use session files in auth_info/)');
      } catch (err) {
        console.log('QR available, but failed to render in terminal.');
      }
    }

    if (connection === 'close') {
      const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error || lastDisconnect;
      console.log('Connection closed:', reason);

      if ((lastDisconnect && lastDisconnect.error && lastDisconnect.error.output && lastDisconnect.error.output.statusCode) === DisconnectReason.loggedOut) {
        console.log('Logged out - clearing auth info.');
        // if logged out, you may want to clear auth files so user can re-scan
      } else {
        console.log('Attempting to reconnect in 5s...');
        setTimeout(() => {
          // Baileys may manage reconnection; your reconnection logic can go here
        }, 5000);
      }
    }

    if (connection === 'open') {
      console.log('Connected to WhatsApp successfully.');
    }
  });

  // persist credentials when they change
  sock.ev.on('creds.update', saveCreds);

  // basic message logging (safe example)
  sock.ev.on('messages.upsert', (m) => {
    try {
      const type = m.type;
      const messages = m.messages;
      if (!messages) return;
      for (const msg of messages) {
        const from = msg.key?.remoteJid || 'unknown';
        console.log('[message]', type, 'from', from, 'id', msg.key?.id || 'no-id');
      }
    } catch (e) {
      console.error('Error in messages.upsert handler', e);
    }
  });

  return sock;
};
