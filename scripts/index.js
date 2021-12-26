const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let ProfileName = document.querySelector('.profile__name');
let ProfileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_name');
let jobInput = document.querySelector('.popup__input_job');
let formElement = document.querySelector('.popup__form');
nameInput.value = ProfileName.textContent;
jobInput.value = ProfileJob.textContent;

function openPopup() {
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  ProfileName.textContent = nameInput.value;
  ProfileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);







