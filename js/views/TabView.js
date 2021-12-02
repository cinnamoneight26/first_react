import { qs, qsAll } from "../helpers.js";
import View from "./View.js";

// tabType - 최근 검색어와 추천 검색어
export const TabType = {
    KEYWORD : 'KEYWORD',
    HISTORY : 'HISTORY'
};

const TabLable = {
    [TabType.KEYWORD] : '추천 검색어',
    [TabType.HISTORY] : '최근 검색어'
};

export default class TabView extends View {
    constructor() {
        super(qs('#tab-view'));
        this.template = new Template();
    }

    show(selectedTab) {
        this.element.innerHTML = this.template.getTabList();

        // 기본으로 추천 검색어 선택
        qsAll('li', this.element).forEach((li) => {
            li.className = li.dataset.tab === selectedTab ? "active" : "";
        });

        super.show();
    }
}

class Template {
    // 여기 어렵다. 나중에 써먹어보자
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
