import React from "react";
// Header 함수형 컴포넌트 import
import Header from "./components/Header.js";
// SearchForm 컴포넌트 추가
import SearchForm from "./components/SearchForm.js";

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
        searchKeyword: ""
      };
    }

  handleChangeInput(searchKeyword) {
    if (searchKeyword.length <= 0) {
      this.reset();
    }
    this.setState( {searchKeyword} )
  }

  search(searchKeyword) {
    console.log(searchKeyword)
  }

  reset() {
    console.log('reset')
  }

  render() {
    return (
    <>
      <Header title="검색" /> 
      {/* <Header title="프로필" /> 
      <Header title="상품" /> */}
      <div className="container">
        <SearchForm 
          value={this.state.searchKeyword}
          onChange={(value) => this.handleChangeInput(value)}
          onSubmit={(searchKeyword) => this.search(searchKeyword)} 
          onReset={() => this.reset()}/>
      </div>

    </>
    );
  }
}
