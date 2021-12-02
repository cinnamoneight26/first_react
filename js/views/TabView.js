import { qs } from "../helpers.js";
import View from "./View.js";

// tabType - 최근 검색어와 추천 검색어
const TabType = {
    KEYWORD : 'KEYWORD',
    HISTORY : 'HISTORY'
};

const TabLable = {
    [TabType.KEYWORD] : '추천 검색어',
    [TabType.HISTORY] : '최근 검색어'
}
export default class TabView extends View {
    constructor() {
        super(qs('#tab-view'));
        this.template = new Template();
    }

    show() {
        this.element.innerHTML = this.template.getTabList();
        super.show();
    }
}

class Template {
    getTabList() {
        return `
        <ul class="tabs">
            ${Object.values(TabType)
                .map(tabType => ({ tabType, tabLable : TabLable[tabType] }))
                .map(this._getTab)
                .join("")
            }
        </ul>`
    }

    _getTab( { tabType, tabLable } ){
        return `
        <li data-tab="${tabType}">
            ${tabLable}
        </li>`
    }
}
