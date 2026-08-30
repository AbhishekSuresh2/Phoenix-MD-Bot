// lib/Message.js
// Small, readable wrapper around a raw Baileys message object with convenience accessors.

class Message {
  constructor(raw) {
    // raw is the message object from Baileys messages.upsert
    this.raw = raw || {};
    // Many of the bot's callers expect fields like key, message, and pushName
    this.key = this.raw.key || {};
    this.message = this.raw.message || this.raw; // sometimes raw message is passed directly
    this.pushName = this.raw.pushName || (this.raw.key && this.raw.key.participant) || null;
  }

  // Returns the sender jid
  sender() {
    return this.key.remoteJid || (this.raw.key && this.raw.key.remoteJid) || null;
  }

  // Returns the plain text body if present (handles common message types)
  getText() {
    if (!this.message) return '';
    // text may be in several locations depending on message type
    if (this.message.conversation) return this.message.conversation;
    if (this.message.extendedTextMessage && this.message.extendedTextMessage.text) return this.message.extendedTextMessage.text;
    if (this.message.imageMessage && this.message.imageMessage.caption) return this.message.imageMessage.caption;
    if (this.message.videoMessage && this.message.videoMessage.caption) return this.message.videoMessage.caption;
    return '';
  }

  // Check whether message contains media
  isMedia() {
    if (!this.message) return false;
    return !!(this.message.imageMessage || this.message.videoMessage || this.message.audioMessage || this.message.documentMessage || this.message.stickerMessage);
  }

  // Get message id
  id() {
    return this.key.id || (this.raw && this.raw.key && this.raw.key.id) || null;
  }

  // Utility to get quoted message id (if exists)
  quotedId() {
    try {
      const quoted = this.message.extendedTextMessage && this.message.extendedTextMessage.contextInfo && this.message.extendedTextMessage.contextInfo.quotedMessage;
      if (!quoted) return null;
      return this.message.extendedTextMessage.contextInfo.stanzaId || null;
    } catch (e) {
      return null;
    }
  }
}

module.exports = Message;
