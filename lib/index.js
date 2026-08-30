// lib/index.js
// Expose the library modules in a readable, documented way.
const Message = require('./Message');
const Base = require('./Base');
const ReplyMessage = require('./ReplyMessage');
const Commands = require('./commands');

module.exports = {
  Message,
  Base,
  ReplyMessage,
  Commands
};
