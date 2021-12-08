import KeywodListView from "./KeywordListView.js";
import { formatRelativeDate, qs } from '../helpers.js';

export default class HistoryListView extends KeywodListView {
    constructor() {
        super(qs('#history-list-view'), new Template());


    }
}

class Template {
getEmptyMessage() {
        return `
        <div class=""empty-box>
            검색 이력이 없습니다.
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

    _getItem({ id, keyword, date }){
        return `
            <li data-keyword="${keyword}">
            ${keyword}
            <span class="date">${formatRelativeDate(date)}</span>
            <button class="btn-remove"></button>
            </li>
        `
    }
}