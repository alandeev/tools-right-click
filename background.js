const commands = [];

try{
  importScripts('/path/translator.js')
  importScripts('/path/dictionary.js')

  commands.push(ChromeTranslator)
  commands.push(ChromeDictionary)
}catch(error) {
  console.log(error)
}

const findCommand = (idCommand) => commands.find(cmd => cmd.id === idCommand);

// Configuring Events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  const command = findCommand(info.menuItemId);
  if (!command) return; // Command not found

  command.execute(info)
});
