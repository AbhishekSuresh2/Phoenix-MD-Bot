// lib/ReplyMessage.js
// Helper builder for sending replies. This file focuses on producing payloads compatible with Baileys `sendMessage` API.

const fs = require('fs');

class ReplyMessage {
  constructor(sendFn) {
    // sendFn should be a function: (jid, payload, options) => Promise
    this.send = sendFn;
  }

  // send a text reply
  async text(jid, text, quoted = null, options = {}) {
    const payload = { text, ...options };
    return this.send(jid, payload, { quoted });
  }

  // send an image (buffer or path)
  async image(jid, imageBufferOrPath, caption = '', quoted = null, options = {}) {
    let image;
    if (Buffer.isBuffer(imageBufferOrPath)) image = imageBufferOrPath;
    else if (typeof imageBufferOrPath === 'string' && fs.existsSync(imageBufferOrPath)) image = fs.readFileSync(imageBufferOrPath);
    else throw new Error('image must be buffer or existing file path');

    const payload = { image, caption, ...options };
    return this.send(jid, payload, { quoted });
  }

  // send a document
  async document(jid, docBufferOrPath, fileName = 'file', quoted = null, options = {}) {
    let doc;
    if (Buffer.isBuffer(docBufferOrPath)) doc = docBufferOrPath;
    else if (typeof docBufferOrPath === 'string' && fs.existsSync(docBufferOrPath)) doc = fs.readFileSync(docBufferOrPath);
    else throw new Error('document must be buffer or existing file path');

    const payload = { document: doc, fileName, ...options };
    return this.send(jid, payload, { quoted });
  }
}

module.exports = ReplyMessage;
