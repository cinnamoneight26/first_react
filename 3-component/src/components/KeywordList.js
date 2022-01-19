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
        const { onclick } = this.props;
        const { KeywordList } = this.state;

        return (
            <List 
                data={this.state.KeywordList} 
                onClick={onClick} 
                hasIndex
            />
        )
    }
}