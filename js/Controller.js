import { TabType } from "./views/TabView.js";

const tag = "[Controller]";

export default class Controller {
  constructor(store, {
    searchFormView,
    searchResultView,
    tabView,
    keywordListView
  }) {
    console.log(tag);
    this.store = store;

    // 검색어 입력
    this.searchFormView = searchFormView;
    // 검색 결과
    this.searchResultView = searchResultView;
    // 최근 검색어/추천 검색어 탭
    this.tabView = tabView;
    // 최근 검색어/추천 검색어 리스트
    this.keywordListView = keywordListView;

    this.subscribeViewEvents();
    // main.js를 통해 브라우저에서 그리자마자 실행
    this.render();
  }

  subscribeViewEvents() {
    // 커스텀 이벤트
    this.searchFormView
      .on('@submit', event => this.search(event.detail.value))
      .on("@reset", () => this.reset());

      // 탭 체인지 이벤트. dataset을 이용
      this.tabView.on('@change', event => this.changeTab(event.detail.value));
  }

  search(keyword) {
    console.log(tag, keyword);
    this.store.search(keyword);
    this.render();
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

  changeTab(tab) {
    console.log(tab);
    // 탭을 클릭할 때 색상 변경 이벤트 : 다시 그려줌
    this.store.selectedTab  = tab;
    this.render();
  }

  render() {
    if (this.store.searchKeyword.length > 0) {
      // 검색 결과가 있을 때는 탭을 숨김
      this.tabView.hide();
      this.keywordListView.hide();
      this.searchResultView.show(this.store.searchResult);

      return;
    }

    // 기본 화면일 때는 탭 보임 - 추천 검색어가 기본
    this.tabView.show(this.store.selectedTab);
    this.searchResultView.hide();

    // 검색어 선택에 따라 분기
    if (this.store.selectedTab == TabType.KEYWORD) {
      this.keywordListView.show(this.store.getKeywordList());
    } else if (this.store.selectedTab == TabType.HISTORY) {
      this.keywordListView.hide();
    } else {
      throw "사용할 수 없는 탭입니다.";
    }
  }
}
