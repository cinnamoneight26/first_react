import React from "react";
import List from "./List.js";
import store from "../Store.js";

export default class KeywordList extends React.Component {
    constructor() {
        super() 

        this.state = {
            KeywordList: [],
        }
    }

    componentDidMount() {
        const KeywordList = store.getKeywordList();
        this.setState( { KeywordList } );
    }

    render() {
        return (
            <List 
                data={this.state.KeywordList} 
                onClick={this.props.onClick} 
                renderItem={(item, index) => {
                    return (
                        <>
                            <span className="number">{index + 1}</span>
                            <span>{item.keyword}</span>
                        </>
                    )
                }}/>
        )
    }
}