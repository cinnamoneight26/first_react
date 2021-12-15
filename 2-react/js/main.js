// 2021.12.16 header tag 생성
const element =  (
    // 자바스크립트 엔진이 자동으로 끝에 세미콜론을 붙여주는 것을 방지하기 위해 괄호를 씀. JSX에서 권장하는 방식
    // JSX의 모양은 HTML이지만 실제로는 자바스크립트이기 때문에 사용방법이 조금다름
    // 어트리뷰트 이름도 그 중 하나인데 html은 소문자만 사용하지만 JSX는 카멜케이스를 사용한다.
    // 자바스크립트에서 class는 예약어 중 하나이기 때문에 jsx에서는 className이라는 속성을 사용한다.
    <header>
        <h2 className="container">검색</h2>
    </header>
);

ReactDOM.render(element, document.querySelector('#app'));