const tag = "[Controller]";

export default class Controller {
  constructor(store, {searchFormView}) {
    console.log(tag);
    this.store = store;

    this.searchFormView = searchFormView;
  
    this.subscribeViewEvents();
  }

  subscribeViewEvents() {
    this.searchFormView.on('@submit', event => this.search(event.detail.value));

  }

  search(ketword) {
    console.log(tag, ketword);
  }
}
