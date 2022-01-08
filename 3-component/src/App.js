import React from "react";
// Header 함수형 컴포넌트 import
import Header from "./components/Header.js";
// SearchForm 컴포넌트 추가
import SearchForm from "./components/SearchForm.js";

export default class App extends React.Component {
  render() {
    return (
    <>
      <Header title="검색" /> 
      {/* <Header title="프로필" /> 
      <Header title="상품" /> */}
      <div className="container">
        <SearchForm />
      </div>

    </>
    );
  }
}
