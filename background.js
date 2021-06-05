const tabs = [];
const instanceTranslator = null

const baseURL = 'https://translate.google.com'

const languageConfig = {
  from: 'en',
  to: 'pt'
}

const findTabByUrl = () => {
  const tab = tabs.find(tab => {
    const tabUrl = tab.pendingUrl
    if(!tabUrl) return false;

    return tabUrl.match(baseURL)
  })

  return tab;
};

const openTranslator = (text, tabId) => {
  if(!text) return;

  const url = `${baseURL}?sl=${languageConfig.from}&tl=${languageConfig.to}&text=${encodeURI(text)}&op=translate`

  tabId ?
  ( chrome.tabs.update(tabId, { url }) ) :
  ( window.open(url) );
}

const handleTranslate = ({ selectionText }) => {
  const tab = findTabByUrl(baseURL)
  const tabId = tab ? tab.id : null;
  openTranslator(selectionText, tabId)
}

const Chrome = {
  contextMenuDetails: {
    "title": "Traduzir seleção",
    "contexts": ["selection"],
    "onclick": handleTranslate
  },
  removeEventCallback: (tabId) => {
    const deletedIndex = tabs.findIndex(c => c.id === tabId);

    tabs.splice(deletedIndex, 1)
  },
  createEventCallback: (tab) => {
    tab.id && chrome.tabs.get(tab.id, (tab) => {
      tabs.push(tab)
    })
  }
}

// Configuring Events
chrome.contextMenus.create(Chrome.contextMenuDetails)
chrome.tabs.onRemoved.addListener(Chrome.removeEventCallback);
chrome.tabs.onCreated.addListener(Chrome.createEventCallback);
