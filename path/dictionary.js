const tabsDictionary = [];
const baseURLDictionary = "https://dicionario.priberam.org";

const findTabByUrlDictionary = () => {
  const tab = tabs.find(tab => {
    const tabUrl = tab.pendingUrl
    if(!tabUrl) return false;

    return tabUrl.match(baseURLDictionary)
  })

  return tab;
}

const removeEventCallBackDictionary = (tabId) => {
  const deletedIndex = tabsDictionary.findIndex(c => c.id === tabId);

  tabsDictionary.splice(deletedIndex, 1);
}

const createEventCallbackDictionary = (tab) => {
  tab.id && chrome.tabs.get(tab.id, (tab) => {
    tabsDictionary.push(tab);
  })
}


const handlerDictionary = ({ selectionText }) => {
  if(!selectionText) return;

  const tab = findTabByUrlDictionary(baseURLDictionary)
  const tabId = tab ? tab.id : null;

  const url = `${baseURLDictionary}/${selectionText}`

  tabId ?
  ( chrome.tabs.update(tabId, { url, active: true }) ) :
  (   chrome.tabs.create({ url, active: true }) )
}

const ChromeDictionary = {
  id: 'dictionary-command',
  execute: handlerDictionary
}

chrome.contextMenus.create({
  id: 'dictionary-command',
  title: 'Pesquisar significado da palavra',
  contexts: ['selection']
});

chrome.tabs.onRemoved.addListener(removeEventCallBackDictionary);
chrome.tabs.onCreated.addListener(createEventCallbackDictionary);
