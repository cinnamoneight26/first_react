import store from './js/Store.js';

class App extends React.Component {
constructor() {
    super();

    this.state = {
        searchKeyword: "",
        searchResult: [],
    };
}
    // 2021.12.18
    // input에 대한 value값은 리엑트에서 관리하고 있지만 onchange 이벤트는
    // 여전히 브라우저에서 관리하고 있다. 에러가 발생하고 있으며 삭제도 입력도 안 되고 있는 상태.
    
    handleChangeInput(event) {
        // this.state.searchKeyword = event.target.value;
        // 리액트 컴포넌트는 스테이트를 변경할 때 주의해야하는 게 있다.
        // 필요할 때만 다시 그리기 때문에 스테이트 변경이 되었다고 다시 그리기 않음.
        // 강제로 컴포넌트를 돌게하려면 아래 메서드를 사용해야 한다.
        // this.forceUpdate();
        // 위의 방법은 리액트를 사용하는 것에 적절하지 않다.
        // 스테이트의 변화를 스스로 감지해서 콘트롤 할 수 있도록 하는 것이 좋음

        const searchKeyword = event.target.value;

        // 검색어가 없을 때 처리 : 2021.12.22
        if(searchKeyword.length <= 0) {
            return this.handleReset();
        }

        this.setState({searchKeyword});
    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('handleSubmit', this.state.searchKeyword);

        this.search(this.state.searchKeyword);
    }

    search(searchKeyword) {
        const searchResult = store.search(searchKeyword)
        this.setState( {searchResult });
    }

    handleReset() {
        // 검색 결과 삭제
        // 아래 setstate만 하면 this.state.searchKeyword가 아직 남아있음
        // !!! setState는 항상 비동기로 동작한다.
        // this.setState({ searchKeyword: ""});
        
        this.setState(() => {
            return { searchKeyword: "" }
        }, () => {

            console.log('reset', this.state.searchKeyword);
        });
    }

    render() {
        // 리엑트에서 조건부 렌더링 하는 방식은 세 가지
        // 1. 엘리먼트 변수를 사용하는 방식
        // 2. 삼항 연산자를 사용하는 방식
        // 3. && 연산자를 사용하는 방식

        // 1. 엘리먼트를 사용하는 방식
        // let resetButton = null;

        // if (this.state.searchKeyword.length > 0) {
        //     resetButton = <button type="reset" className="btn-reset"></button>
        // }


        return (
            <>
                <header>
                    <h2 className="container">검색</h2>
                </header>
                <div className="container">
                    {/* onSubmit - input에서 엔터치면 이벤트 발생 */}
                    <form 
                        onSubmit={event => this.handleSubmit(event)}
                        // 내가 해보기
                        onReset={() => this.handleReset()}
                    >
                        <input 
                        type="text" 
                        placeholder="검색어를 입력하세요." 
                        autoFocus 
                        value={this.state.searchKeyword}
                        onChange={event => this.handleChangeInput(event)}
                        />
                        {/* 1. 엘리먼트를 이용하여 표현하는 방식 */}
                        {/* {resetButton} */}

                        {/* 2. 삼항 연산자를 이용하는 방식 */}
                        {/* {this.state.searchKeyword.length > 0 ? 
                            <button type="reset" className="btn-reset"></button> :
                            null} */}

                        {/* 3. &&연산자를 이용하는 방식 : 첫번째 조건이 참이 되어야 두번째 조건을 실행 */}
                        {this.state.searchKeyword.length > 0 &&
                            <button type="reset" className="btn-reset"></button> 
                        }
                        {/* <button type="reset" className="btn-reset"></button> */}
                    </form>
                    {/* 2021.12.23 검색 결과 표시 - 검색 결과 여부에 따라 구현해야하기 때문에 조건부 랜더링으로 구현해야 함 */}
                    <div className="content">
                        {this.state.searchResult.length > 0 ? (
                            <ul className="result">
                                {this.state.searchResult.map(item => {
                                    return (
                                        <li>
                                            <img src={item.imageUrl} alt={item.name}></img>
                                            <p>{item.name}</p>
                                        </li>
                                    )
                                })}
                            </ul>
                        ) : (
                            <div className="empty-box">검색 결과가 없습니다.</div>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

// 2021.12.16 header tag 생성
// const element =  (
    // 자바스크립트 엔진이 자동으로 끝에 세미콜론을 붙여주는 것을 방지하기 위해 괄호를 씀. JSX에서 권장하는 방식
    // JSX의 모양은 HTML이지만 실제로는 자바스크립트이기 때문에 사용방법이 조금다름
    // 어트리뷰트 이름도 그 중 하나인데 html은 소문자만 사용하지만 JSX는 카멜케이스를 사용한다.
    // 자바스크립트에서 class는 예약어 중 하나이기 때문에 jsx에서는 className이라는 속성을 사용한다.
    // 리엑트는 하나의 루트 노드가 있어야 한다는 제약사항이 있음
    // 그래서 엘리먼트들을 감싸주는 div를 생성했으나 비어있는 태그(프래그먼트-Fragment)로 사용해도 무방하다.
    // DOM에는 반영되지 않음
    // <>
    //     <header>
    //         <h2 className="container">검색</h2>
    //     </header>
    //     <div className="container">
    //         <form>
    //             <input type="text" placeholder="검색어를 입력하세요." autoFocus />
    //             <button type="reset" className="btn-reset"></button>
    //         </form>
    //     </div>
    // </>
    // 2021.12.17 리액트 컴포넌트
// );

// ReactDOM.render(element, document.querySelector('#app'));
ReactDOM.render(<App />, document.querySelector('#app'));