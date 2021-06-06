const tabs = [];
const baseURLTranslator = 'https://translate.google.com';

const languageConfigTranslator = {
  from: 'en',
  to: 'pt'
}

const findTabByUrlTranslator = () => {
  const tab = tabs.find(tab => {
    const tabUrl = tab.pendingUrl
    if(!tabUrl) return false;

    return tabUrl.match(baseURLTranslator)
  })

  return tab;
}

const removeEventCallBackTranslator = (tabId) => {
  const deletedIndex = tabs.findIndex(c => c.id === tabId);

  tabs.splice(deletedIndex, 1);
}

const createEventCallbackTranslator = (tab) => {
  tab.id && chrome.tabs.get(tab.id, (tab) => {
    tabs.push(tab);
  })
}

const handlerTranslator = ({ selectionText }) => {
  if(!selectionText) return;

  const tab = findTabByUrlTranslator(baseURLTranslator)
  const tabId = tab ? tab.id : null;

  const url = `${baseURLTranslator}?sl=${languageConfigTranslator.from}&tl=${languageConfigTranslator.to}&text=${encodeURI(selectionText)}&op=translate`

  tabId ?
  ( chrome.tabs.update(tabId, { url, active: true }) ) :
  (   chrome.tabs.create({ url, active: true }) )
}


const ChromeTranslator = {
  id: 'translator-command',
  execute: handlerTranslator
}

chrome.contextMenus.create({
  id: 'translator-command',
  title: 'Traduzir texto selecionado',
  contexts: ['selection']
});

chrome.tabs.onRemoved.addListener(removeEventCallBackTranslator);
chrome.tabs.onCreated.addListener(createEventCallbackTranslator);
