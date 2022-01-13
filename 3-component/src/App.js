import React from "react";
// Header 함수형 컴포넌트 import
import Header from "./components/Header.js";
// SearchForm 컴포넌트 추가
import SearchForm from "./components/SearchForm.js";
import SearchResult from "./components/SearchResult.js";
import Store from "./Store.js";
import Tabs, {TabType} from './components/Tabs.js';
import KeywordList from './components/KeywordList.js';


export default class App extends React.Component {
    constructor() {
      super();

      /**
         * 종종 동일한 데이터에 대한 변경사항을 여러 컴포넌트에 반영해야 할 필요가 있습니다.
         * 이럴 때는 가장 가까운 공통 조상으로 state를 끌어올리는 것이 좋습니다.
         * https://ko.reactjs.org/docs/lifting-state-up.html
         * 
         * 기존에 searchForm.js에서 관리하던 statu를 부모인 App으로 옮김
         */

      this.state = {
        searchKeyword: "",
        searchResult:[],
        submitted: false,
        selectedTab: TabType.KEYWORD,
      };
    }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.reset();
    }
    this.setState( {searchKeyword} )
  }

  search(searchKeyword) {
    const searchResult =  Store.search(searchKeyword);
    
    this.setState({
      searchKeyword,
      searchResult,
      submitted: true
    });
  }

  reset() {
    this.setState({
      searchKeyword:"",
      submitted : false,
      searchResult: []
    })
  }

  render() {
    const { searchKeyword, submitted, searchResult, selectedTab } = this.state;

    return (
    <>
      <Header title="검색" /> 
      {/* <Header title="프로필" /> 
      <Header title="상품" /> */}
      <div className="container">
        <SearchForm 
          value={searchKeyword}
          onChange={(value) => this.handleChangeInput(value)}
          onSubmit={() => this.search(searchKeyword)} 
          onReset={() => this.reset()}/>
        <div className="content">
          {submitted ? 
            <SearchResult data={searchResult}/> :
            <> 
              <Tabs selectedTab={selectedTab} onChange={(selectedTab) => this.setState( {selectedTab} )} />
              {selectedTab === TabType.KEYWORD && (
                <KeywordList onClick={(keyword) => this.search(keyword)} />
              )}
              {selectedTab === TabType.HISTORY && <>최근 검색어 목록</>}
            </>}
        </div>
        
      </div>

    </>
    );
  }
}
