import { qs } from "../helpers.js";
import View from "./view.js";

export default class SearchFormView extends View{
    constructor() {
        super(qs("#search-form-view"));

        this.resetElement = qs("[type=reset]", this.element);
        this.showResetButotn(true);
    }

    showResetButotn(visible = true) {
        this.resetElement.style.display = visible ? "block" : "none";
    }
}