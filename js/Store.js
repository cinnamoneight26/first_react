import { createNextId } from './helpers.js';
import {
  TabType
} from './views/TabView.js';

const tag = "[store]";

export default class Store {
  constructor(storage) {
    console.log(tag);
    if (!storage) throw "no storage";

    this.storage = storage;

    this.searchKeyword = "";
    this.searchResult = [];
    this.selectedTab = TabType.KEYWORD;
  }

  // model
  search(keyword) {
    this.searchKeyword = keyword;
    this.searchResult = this.storage.productData.filter(product =>
      product.name.includes(keyword)
    );

    // 검색 시 검색어를 저장하여 최근 검색어에 추가
    this.addHistory(keyword);
  }

  getKeywordList() {
    return this.storage.keywordData;
  }

  getHistoryList() {
    return this.storage.historyData.sort(this._sortHistory);
  }


  // 파이어폭스에서는 해당 코드로 정상처리되지만 일부 브라우저에서는 불가
  // 비교연산이 아닌 산술 연산식으로 사용해야 함
  // _sortHistory(history1, history2) {
  //   return history2.date > history1.date;
  // }
  _sortHistory(history1, history2) {
    return history2.date - history1.date;
  }

  removeHistory(keyword) {
    this.storage.historyData = this.storage.historyData.filter(
      history => history.keyword !== keyword
    );
  }

  addHistory(keyword) {
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

}
