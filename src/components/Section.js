export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialCards = items;
    this._renderer = renderer;
    this._container = containerSelector;

  }

  addItem(element) {
    this._container.prepend(element)
  }

  render() {
    this._initialCards.forEach(card => this._renderer(card))

  }
}