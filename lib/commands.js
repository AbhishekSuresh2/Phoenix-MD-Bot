// lib/commands.js
// Simple dynamic command loader. It reads the plugins folder and returns a map of command name -> handler.

const fs = require('fs');
const path = require('path');

function loadCommands(pluginsDir = path.join(__dirname, '..', 'plugins')) {
  const commands = new Map();
  try {
    if (!fs.existsSync(pluginsDir)) return commands;
    const files = fs.readdirSync(pluginsDir);
    for (const file of files) {
      if (!file.endsWith('.js')) continue;
      try {
        const pluginPath = path.join(pluginsDir, file);
        // require the plugin. A plugin can export { name, handler } or module.exports = function
        const plugin = require(pluginPath);
        if (!plugin) continue;
        // support different export shapes
        if (typeof plugin === 'function') {
          const name = plugin.name || file.replace(/\.js$/, '');
          commands.set(name, plugin);
        } else if (plugin.name && plugin.handler) {
          commands.set(plugin.name, plugin.handler);
        } else if (plugin.command && plugin.execute) {
          commands.set(plugin.command, plugin.execute);
        } else {
          // fallback: use filename as command name and export whatever is exported
          commands.set(file.replace(/\.js$/, ''), plugin);
        }
      } catch (e) {
        console.error('Failed to load plugin', file, e && e.message);
      }
    }
  } catch (e) {
    console.error('Failed to read plugins directory', e && e.message);
  }
  return commands;
}

module.exports = {
  loadCommands
};
