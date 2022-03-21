import Popup from './../components/Popup';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;

    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');
    this._button = this._popupSelector.querySelector('.popup__button-save')

  }

  _getInputValues = () => {
    const res = {}
    this._inputList.forEach(item => res[item.name] = item.value);
    return res;
  }

  changeSubmitHandler(newSubmitHendler) {
    this._formSubmitCallback = newSubmitHendler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (e) => {
      e.preventDefault()


      this._formSubmitCallback(this._getInputValues)


    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}