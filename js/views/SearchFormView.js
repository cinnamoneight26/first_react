import { on, qs } from "../helpers.js";
import View from "./view.js";

const tag = '[SearchFormView]'
export default class SearchFormView extends View{
    constructor() {
        console.log(tag)
        super(qs("#search-form-view"));

        // 입력 이벤트를 받기위한 element select
        this.inputElement = qs('[type=text]', this.element);
        // reset btn show/hide를 위한 element select
        this.resetElement = qs("[type=reset]", this.element);
        // 첫 화면에서는 reset 버튼 hide
        this.showResetButotn(false);
        this.bindEvent();
        this.bindResetSclickEvent();
    }

    showResetButotn(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }
    
    bindEvent() {
        on(this.inputElement, "keyup", () => this.handleKeyup())
    }

    // keyup event : 검색어를 delete로 삭제하면 버튼이 사라지지만 reset버튼 클릭 시에는 그대로 남아있음.
    handleKeyup() {
        const {value} = this.inputElement;
        this.showResetButotn(value.length > 0);
    }

    // 2021.11.29 개인적인 추가 : reset 버튼 클릭하여 검색어를 삭제했을 때도 버튼 숨기는 기능 추가해보기
    bindResetSclickEvent() {
        on(this.resetElement, 'click', () => this.resetSclickEvent());
    }
    resetSclickEvent() {
        this.showResetButotn(false);
        // focus도...
        this.inputElement.focus();
    }


}