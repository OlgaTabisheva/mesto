import Popup from './../components/Popup';


export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._formData = []
    this._form = this._popupSelector.querySelector('.popup__form');

  }

  _getInputValues() {
    for (var i = 0; i < this._form.elements.length; i++) {
      const fieldName = this._form.elements[i].name;
      const fieldValue = this._form.elements[i].value;
      this._formData [fieldName] = fieldValue;
    }

    console.log(this._formData)
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', this._formSubmitCallback)

  }

  close() {
    console.log(this)
    super.close();
    this._form.reset();

  }
}