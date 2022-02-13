export class FormValidator {
  constructor(settings, form) {
    this._form = form
    this._settings = settings
  }

  _showError(input, errorContainer) {
    input.classList.add(this._settings.inputErrorClass);
    errorContainer.classList.add(this._settings.errorVisibleClass);
    errorContainer.textContent = input.validationMessage;
  }

  _hideError(input, errorContainer,) {
    input.classList.remove(this._settings.inputErrorClass);
    errorContainer.classList.remove(this._settings.errorVisibleClass);
    errorContainer.textContent = '';
  }

  _toggleButton() {
    const button = this._form.querySelector(this._settings.buttonSelector);
    const isFormValid = this._form.checkValidity();

    if (isFormValid) {
      button.classList.remove(this._settings.inactiveButtonClass)
      button.removeAttribute("disabled")
    } else {
      button.classList.add(this._settings.inactiveButtonClass)
      button.setAttribute("disabled", '')
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
    const inputs = this._form.querySelectorAll(this._settings.inputSelector);
    inputs.forEach(input => {
      input.addEventListener("input", () => {
        this._validateInput(input);
      });
    });
    this._toggleButton();

  }
}














/*
function showError(input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorVisibleClass);
  errorContainer.textContent = input.validationMessage;
}

function hideError(input, errorContainer, { inputErrorClass, errorVisibleClass }) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorVisibleClass);
  errorContainer.textContent = '';
}

function toggleButton(form, {buttonSelector, inactiveButtonClass}){
  const button = form.querySelector(buttonSelector);
  const isFormValid = form.checkValidity();

  if(isFormValid) {
    button.classList.remove(inactiveButtonClass)
    button.removeAttribute("disabled")
  } else {
    button.classList.add(inactiveButtonClass)
    button.setAttribute("disabled",'')
  }

}

function validateInput(form, input, classes){
  const errorContainer = form.querySelector(`#error-${input.id}`);
  if (input.validity.valid) {
    hideError(input, errorContainer, classes);
  } else {
    showError(input, errorContainer, classes );
  }
  toggleButton(form, classes);
}


function enableValidation({ formSelector, inputSelector, ...rest}) {
  const forms = document.querySelectorAll (formSelector);

  forms.forEach(form => {
    form.addEventListener("submit", submitForm);

    const inputs = form .querySelectorAll(inputSelector);

    inputs.forEach(input => {
      input.addEventListener("input", () =>{
        validateInput(form, input, rest);
      });
    });
    toggleButton(form, rest);
  })
}
*/


