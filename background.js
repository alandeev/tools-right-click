const commands = [];

try{
  importScripts('/path/translator.js')

  commands.push(ChromeTranslator)
}catch(error) {
  console.log(error)
}

// Configuring Events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const command = commands.find(cmd => cmd.id === info.menuItemId);
  if (!command) return

  command.execute(info)
});
