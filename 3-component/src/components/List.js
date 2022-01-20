// import React from "react";

// const List =({data = [], onClick, renderItem}) => {
//     return (
//         <ul className="list">
//             {data.map( (item, index) => {
//                 return (
//                     <li key={item.id} onClick={() => onClick(item.keyword)}>
//                         {renderItem(item, index)}
//                     </li>
//                 )
//             })}
//         </ul>
//     )
// }

/**
 * 코드를 줄이는 방법은 공통 로직을 하나로 만들고 이를 재사용하는 것
 * 공통 로직을 부모 클래스에게 올려버리고 이를 상속하여 코드를 재활용하거나 단일 역할의 함수를 조합하여 또 다른 일을 하는 함수를 만들어 함수를 재활용 할 수 있다.
 * 
 * 상속은 전통적인 객체지향 프로그래밍 스타일의 상속 구조를 활용할 수 있다는 점에서 익숙하지만 상속 단계가 만아지면 코드를 파악하는데 다소 어려울 수 있다는 단점이 있음
 * 특히 state에 반응하는 UI코드가 상속 구조에 가려 잘 보이지 않을 수 있어서 리액트 커뮤니티에서는 지양하는 분위기를 나타낸다.
 * 
 * 조합 : 컴포넌트 조합. 리액트의 props에는 어떠한 자바스크립트 값도 전달할 수 있어서 이를 활용하여 컴포넌트를 조합한다. 
 * 
 */
// export default List;

// 특수화

import React from "react";
import { formatRelativeDate } from "../helpers.js";

const List =({
    data = [], 
    onClick, 
    hasIndex=false, 
    hasDate = false, 
    onRemove,
}) => {

    const handleClickRemove = (event, keyword) => {
        event.stopPropagation();
        onRemove(keyword);
    }

    return (
        <ul className="list">
            {data.map( (item, index) => {
                return (
                    <li key={item.id} onClick={() => onClick(item.keyword)}>
                        {hasIndex && <span className="number">{index + 1}</span>}
                        <span>{item.keyword}</span>
                        {hasDate &&  <span className="date">{formatRelativeDate(item.date)}</span>}
                        {!! onRemove && <button 
                                className="btn-remove" 
                                onClick={event => handleClickRemove(event, item.keyword)}>
                            </button> }
                    </li>
                )
            })}
        </ul>
    )
}

export default List;