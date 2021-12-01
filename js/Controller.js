const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView, searchResultView}) {
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
    this.searchResultView = searchResultView;
  
    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView.on('@submit', event => 
      this.search(event.detail.value)
      ).on("@reset",() => this.reset()); 
  }

  search(keyword) {
    console.log(tag, keyword);
    this.store.search(keyword);
    this.render()
  }

  reset() {
    console.log(tag, "reset");
    // 리셋버튼 클릭 시 검색 결과 삭제 - 내가 구현해 본 코드
    // this.store.searchKeyword = '';
    // this.render();

    // 수업 코드 : store class에서 searchKeyword와 searchResult를 초기화해줌
    this.store.searchKeyword = '';
    this.store.searchResult = [];
    this.render();
  }

  render() {
    if  (this.store.searchKeyword.length > 0) {
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.searchResultView.hide();
  }
}
