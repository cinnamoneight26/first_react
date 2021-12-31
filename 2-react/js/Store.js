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
}

const store = new Store(storage)
export default store;