import View from "./View.js";
import { delegate, qs } from "../helpers.js";

const tag = "[KeywordListView]";

export default class KeywodListView extends View {
    constructor(element = qs('#keyword-list-view'), template = new Template()){
        // 기존의 추천 검색어 구현 부분. 최근 검색어 구현을 위해 외부에서 받는 형태로 변경
        // super(qs('#keyword-list-view'));
        // this.template = new Template();

        // 외부에서 받는 형태로 변경됨
        super(element);
        this.template = template;
        
        this.bindEvents();
    }

    bindEvents() {
        delegate(this.element, "click", 'li', event => this.handleClick(event))
    }

    handleClick(event) {
        console.log(event.target.dataset.keyword);
        const value = event.target.dataset.keyword;
        this.emit("@click", { value });
    }

    show(data = []) {
        this.element.innerHTML = data.length > 0 
        ? this.template.getList(data) 
        : this.template.getEmptyMessage();

        super.show();
    }
}

class Template {
    getEmptyMessage() {
        return `
        <div class=""empty-box>
            추천 검색어가 없습니다.
        </div>
        `
    }

    getList(data = []) {
        return `
        <ul class="list">
            ${data.map(this._getItem).join("")}
        </ul>
        `
    }

    _getItem({id, keyword}){
        return `
            <li data-keyword="${keyword}">
        <span class="number">${id}</span>
        ${keyword}
            </li>
        `
    }
}
