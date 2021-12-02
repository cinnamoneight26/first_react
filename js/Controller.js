const tag = "[Controller]";

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView
  }) {
    console.log(tag);
    this.store = store;

    // 검색어 입력
    this.searchFormView = searchFormView;
    // 검색 결과
    this.searchResultView = searchResultView;
    // 최근 검색어/추천 검색어 탭
    this.tabView = tabView;

    this.subscribeViewEvents();
    // main.js를 통해 브라우저에서 그리자마자 실행
    this.render();
  }

  subscribeViewEvents() {
    // 커스텀 이벤트
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on("@reset", () => this.reset());
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
    if (this.store.searchKeyword.length > 0) {
      this.tabView.hide();
      this.searchResultView.show(this.store.searchResult);
      return;
    }

    this.tabView.show();
    this.searchResultView.hide();
  }
}
