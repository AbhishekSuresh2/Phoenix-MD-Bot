const { Sequelize } = require('sequelize');
const fs = require('fs');

if (fs.existsSync('config.env')) {
  require('dotenv').config({
      path: './config.env'
  });
};

const toBool = (x) => (x && (x.toLowerCase() === 'true' || x.toLowerCase() === 'on')) || false;
const DATABASE_URL = process.env.DATABASE_URL === undefined ? "./database.db" : process.env.DATABASE_URL

module.exports = {
   //__________________________________________________________________________________________________________________________________________
  // 🖥️ For Enabling Commands Like AUTO_MSG_READ Type true For Disabling Type false  
 // ℹ️ Removed commands like welcome,goodbye etc and other commands and features that cause whatsapp account/group ban thank you!
//____________________________________________________________________________________________________________________________________________  
  //🤖 BOT CONFIGURATION
  SESSION_ID: process.env.SESSION_ID || 'on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Start application
      run: npm start',
  STICKER_DATA: process.env.STICKER_DATA || '🎯ᴘʜᴏᴇɴɪx-ᴍᴅ;ᴀʙʜɪꜱʜᴇᴋ ꜱᴜʀᴇꜱʜ🍀',
  ALIVE_DATA: process.env.ALIVE_DATA || '👋 ʜᴇʏ &sender, ɪ ᴍ *ᴘʜᴏᴇɴɪx-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ* ᴀʟɪᴠᴇ ɴᴏᴡ!\n\n📌 ᴛʏᴘᴇ *menu* ᴛᴏ ɢᴇᴛ ᴍʏ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ.\n\n*ᴘʟᴀᴛꜰᴏʀᴍ:* &platform\n*ʀᴜɴᴛɪᴍᴇ:* &runtime;https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg',
  AUDIO_DATA: process.env.AUDIO_DATA || 'Phoenix-MD;Abhishek Suresh;https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg',
  BOT_INFO: process.env.BOT_INFO || 'ᴘʜᴏᴇɴɪx-ᴍᴅ;ᴀʙʜɪꜱʜᴇᴋ ꜱᴜʀᴇꜱʜ;919074692450;https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg', 
  PREFIX: process.env.PREFIX || '.', //Type false to use without prerix
  MODE: process.env.MODE || 'private', //Type public to change bot mode to public
  SUDO: process.env.SUDO || '919074692450, 918157993101',
  ELEVENLABS_API_KEY: process.env.ELEVENLABS_API_KEY || '',
  TIMEZONE: process.env.TIMEZONE || "Asia/Kolkata",
  BOT_LANG: process.env.BOT_LANG || 'EN',
  START_MSG: toBool(process.env.START_MSG || 'true'),
  ERROR_MSG: toBool(process.env.ERROR_MSG || 'true'), 

  //🛜 DEPLOY/HOSTING NAME AND API KEY
  HEROKU_APP_NAME: process.env.HEROKU_APP_NAME || '',
  HEROKU_API_KEY: process.env.HEROKU_API_KEY || '',
  RENDER_NAME: process.env.RENDER_NAME || '',
  RENDER_API: process.env.RENDER_API || '',
  KOYEB_APP_NAME: process.env.KOYEB_APP_NAME || '',
  KOYEB_API_KEY: process.env.KOYEB_API_KEY || '',
  
  //AUTOMATION 🎯
  AUTO_ALWAYS_ONLINE: toBool(process.env.AUTO_ALWAYS_ONLINE || 'false'),
  AUTO_CALL_REJECT: toBool(process.env.AUTO_CALL_REJECT || 'false'),
  AUTO_CALL_REJECT_MSG: process.env.AUTO_CALL_REJECT_MSG || '*ᴀᴜᴛᴏᴍᴀᴛᴇᴅ ᴄᴀʟʟ ʙʟᴏᴄᴋɪɴɢ*\n\nꜱᴏʀʀʏ ᴄᴀʟʟꜱ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ\n\nᴘʟᴇᴀꜱᴇ ꜱᴇɴᴅ ᴀ ᴛᴇxᴛ ᴍᴇꜱꜱᴀɢᴇ/ᴠᴏɪᴄᴇ ᴍᴇꜱꜱᴀɢᴇ\n\n> ᴘʜᴏᴇɴɪx-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',
  AUTO_MSG_READ: toBool(process.env.AUTO_MSG_READ || 'false'),
  AUTO_MSG_REACT: toBool(process.env.AUTO_MSG_REACT || 'false'),

  //AUTOMATION-FIX SOON 🎯
  AUTO_STATUS_SAVER: toBool(process.env.AUTO_STATUS_SAVER || 'false'),
  AUTO_STATUS_VIEW: toBool(process.env.AUTO_STATUS_VIEW || 'false'),
  AUTO_STATUS_REPLY: toBool(process.env.AUTO_STATUS_REPLY || 'false'),
  AUTO_STATUS_REPLY_MSG: process.env.AUTO_STATUS_REPLY_MSG || '_*Nice Status Bro 🍀*_',
  AUTO_STATUS_REACT: toBool(process.env.AUTO_STATUS_REACT || 'false'),
  AUTO_STATUS_REACT_EMOJIS: process.env.AUTO_STATUS_REACT_EMOJIS || ['💎','🤍','🍀','💀','📈','🎯','🫶','👀','☠️'],
//_______________#OTHER(⚠️ Warning Dont Edit Anything Here)______________________________________________________________________________________
  BASE_URL: 'https://abhi-api.vercel.app/', // Don't Change This
  BRANCH: 'main',
  DATABASE: DATABASE_URL === "./database.db" ? new Sequelize({ dialect: "sqlite", storage: DATABASE_URL, logging: false }) : new Sequelize(DATABASE_URL, {dialect: "postgres", ssl: true, protocol: "postgres", dialectOptions: { native: true, ssl: { require: true, rejectUnauthorized: false },}, logging: false })
};
