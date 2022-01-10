import React from 'react';

/**
 * 
 *  기존 클래스 컴포넌트로 구현했던 searchForm을 statu 끌어올리기를 하면서
 *  함수형 컴포넌트로 수정.
 *  SearchForm에서 구현했던 state를 다른 컴포넌트에서도 사용해야하기 때문에
 *  부모인 App 컴포넌트로 이동했다.
 * 
 */
const SearchForm = ({ value, onChange, onSubmit, onReset })=> {
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit();
    }

    const handleReset = () => {
        onReset();
    }

    const handleChangeInput = (event) =>  {
        onChange(event.target.value);
    }
    
    return (
        <form 
                onSubmit={handleSubmit} 
                onReset={handleReset}>
                <input 
                    type="text" 
                    placeholder="검색어를 입력하세요." 
                    autoFocus 
                    value={value}
                    onChange={handleChangeInput}
                />
                {value.length > 0 &&
                    <button type="reset" className="btn-reset"></button> 
                }
            </form>
    )
};

export default SearchForm;
