import React from 'react';

// 이 컴포넌트를 외부에서 모듈로 등록하여 쓸 수 있도록 expert default 기본 모듈로 설정
export default class SearchForm extends React.Component {
    constructor() {
        super()

        this.state = {
            searchKeyword : ""
        };
    }

    handleChangeInput(event) {
        const searchKeyword = event.target.value;

        if(searchKeyword.length <= 0 ) {
            this.handleReset();
        }
        
        this.setState({ searchKeyword })
    }
    
    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(this.state.searchKeyword);
    }

    handleReset() {
        this.props.onReset();
    }

    render() {
        return (
            <form 
                onSubmit={event => this.handleSubmit(event)} 
                onReset={() => this.handleReset()}>
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요." 
                    autoFocus 
                    value={this.state.searchKeyword}
                    onChange={event => this.handleChangeInput(event)}
                />
                {this.state.searchKeyword.length > 0 &&
                    <button type="reset" className="btn-reset"></button> 
                }
            </form>
        )
    }
}
