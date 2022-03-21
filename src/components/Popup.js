export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popupSelector.classList.add('popup_opened');
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (ev) => {
      this._handleEscClose(ev)
    });
  }


  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
    })


  }
}