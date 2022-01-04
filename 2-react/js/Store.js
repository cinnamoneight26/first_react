import { createNextId } from './helpers.js';
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
    // 검색할 때마다 이력 추가
    this.addHistory(keyword)

    return this.searchResult = this.storage.productData.filter(product =>
      product.name.includes(keyword)
    );
  }

  // 검색어 입력 받아서 저장 : 없는 경우 빈 문자열
  addHistory(keyword = "") {
    keyword = keyword.trim();
    if(!keyword) {
      return;
    }

    // 리스트를 확인하여 검색어가 있는지 체크
    const hasHistory = this.storage.historyData.some(history => history.keyword === keyword) 

    // 결과가 있으면 삭제
    if (hasHistory) {
      this.removeHistory(keyword);
    }
    
    // 키워드가 없으면...
    const id = createNextId(this.storage.historyData);
    const date = new Date();
    this.storage.historyData.push({ id, keyword, date});
    this.storage.historyData = this.storage.historyData.sort(this._sortHistory); 
  
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory)
  }

  // 파이어폭스에서는 해당 코드로 정상처리되지만 일부 브라우저에서는 불가
  // 비교연산이 아닌 산술 연산식으로 사용해야 함
  // _sortHistory(history1, history2) {
  //   return history2.date > history1.date;
  // }
  _sortHistory(history1, history2) {
    return history2.date - history1.data;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      history => history.keyword !== keyword
    );
  }
}

const store = new Store(storage)
export default store;