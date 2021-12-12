import { on, qs } from "../helpers.js";
import View from "./view.js.js";

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
        this.bindEvents();
    }

    showResetButotn(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }
    
    bindEvents() {
        on(this.inputElement, "keyup", () => this.handleKeyup());
        on(this.element, "submit", (event) => this.handleSubmit(event));
        // 2021.11.29 개인적인 추가 : reset 버튼 클릭하여 검색어를 삭제했을 때도 버튼 숨기는 기능 추가해보기
        on(this.resetElement, 'click', () => this.resetSclickEvent());

    }

    // keyup event : 검색어를 delete로 삭제하면 버튼이 사라지지만 reset버튼 클릭 시에는 그대로 남아있음.
    handleKeyup() {
        const { value } = this.inputElement;
        this.showResetButotn(value.length > 0);

        if (value.length <= 0) {
            this.resetSclickEvent();
        }
    }

    // enter 시 목록
    handleSubmit(event) {
        // 새로고침 금지 - form의 기본 동작 취소
        event.preventDefault();
        const { value } = this.inputElement;
        this.emit("@submit", { value } );
    }

    resetSclickEvent() {
        // 개인 추가
        this.showResetButotn(false);
        // focus도...
        this.inputElement.focus();

        // 수업 내용 - 리셋버튼 클릭 시 검색 결과 삭제
        this.emit("@reset");
    }

    // 추천 검색어/ 최근 검색어 클릭 시 검색어 입력 input창에 검색어가 들어가게 함
    show(value = "") {
        this.inputElement.value = value;
        // 검색어와 함께 검색어 삭제 버튼도 보이도록 함
        this.showResetButotn(this.inputElement.value.length > 0);

        super.show();
    }

}