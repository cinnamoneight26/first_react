import Controller from "./Controller.js";
import Store from "./store.js";
import storage from "./storage.js";
import SearchFormView from "./views/searchFormView.js";
import SearchResultView from "./views/SearchResultView.js";
import TabView from "./views/TabView.js";
import KeywodListView from "./views/KeywordListView.js";

const tag = '[main]';
document.addEventListener("DOMContentLoaded", main);

function main() {
  console.log(tag, 'main')
  const store = new Store(storage);

  const views = {
    searchFormView : new SearchFormView(),
    searchResultView : new SearchResultView(),
    tabView : new TabView(),
    keywordListView : new KeywodListView()
  };

  new Controller(store, views);
}
