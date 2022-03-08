export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._handleEscClose = (event) => {
      if (event.key === 'Escape') {
        this.close();
      }
      console.log('_handleEscClose()')
    }
  }

  open() {
    document.addEventListener('keydown', this._handleEscClose)
    this._popupSelector.classList.add('popup_opened');
    console.log('open()')
  }

  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (ev) => {
      this._handleEscClose(ev)
    });
    console.log('close()')
  }


  setEventListeners() {
    this._popupSelector.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close()
      }
      if (evt.target.classList.contains('popup__close')) {
        this.close()
      }
      console.log('setEventListeners()')
    })


  }
}