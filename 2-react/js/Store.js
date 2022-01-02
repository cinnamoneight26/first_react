import storage from './storage.js';

const tag = "[store]";

class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw "no storage";

    this.storage = storage;
  }

  // model
  search(keyword) {
    return this.searchResult = this.storage.productData.filter(product =>
      product.name.includes(keyword)
    );
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHidtoryList() {
    return this.storage.historyData.sort(this._sortHistory)
  }

  _sortHistory(history1, history2) {
    return history2.date > history1.data;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      history => history.keyword !== keyword
    );
  }
}

const store = new Store(storage)
export default store;