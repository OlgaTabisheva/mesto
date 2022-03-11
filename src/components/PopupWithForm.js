import Popup from './../components/Popup';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;

    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._popupSelector.querySelectorAll('.popup__input');


  }
  _getInputValues = () =>  {
    const res = {}
    this._inputList.forEach(item => res[item.name] = item.value );
    return res;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', () => this._formSubmitCallback(this._getInputValues));
  }

  close() {
    super.close();
    this._form.reset();
  }
}