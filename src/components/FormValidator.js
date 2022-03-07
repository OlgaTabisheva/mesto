export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
    this._inputErrorClass = settings.inputErrorClass
    this._errorVisibleClass =settings.errorVisibleClass
    this._inactiveButtonClass =settings.inactiveButtonClass
    this._submitButton = form.querySelector(settings.buttonSelector)
    this._inputList = form.querySelectorAll(this._settings.inputSelector)
  }

  _showError(input, errorContainer) {
    input.classList.add(this._inputErrorClass);
    errorContainer.classList.add(this._errorVisibleClass);
    errorContainer.textContent = input.validationMessage;
  }

  _hideError(input, errorContainer,) {
    input.classList.remove(this._inputErrorClass);
    errorContainer.classList.remove(this._errorVisibleClass);
    errorContainer.textContent = '';
  }

  _toggleButton() {
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      this._submitButton.classList.remove(this._inactiveButtonClass)
      this._submitButton.removeAttribute("disabled")
    } else {
      this._submitButton.classList.add(this._inactiveButtonClass)
      this._submitButton.setAttribute("disabled", '')
    }

  }

  _validateInput(input) {
    const errorContainer = this._form.querySelector(`#error-${input.id}`);
    if (input.validity.valid) {
      this._hideError(input, errorContainer);
    } else {
      this._showError(input, errorContainer);
    }
    this._toggleButton();
  }

  _submitForm(event) {
    event.preventDefault();
  }

  enableValidation() {
    this._form.addEventListener("submit", this._submitForm);
    this._inputList.forEach(input => {
      input.addEventListener("input", () => {
        this._validateInput(input);
      });
    });
    this._toggleButton();

  }
}
















