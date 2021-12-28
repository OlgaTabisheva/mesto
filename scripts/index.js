const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_job');
let formElement = document.querySelector('.popup__form');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);


popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);







