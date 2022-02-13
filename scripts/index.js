
import {FormValidator} from './validate.js'
import {initialCards} from './initialArray.js'

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const viewCardModal = document.querySelector('.popup_type_image-container');
const describePlace = document.querySelector('.popup__place-name')
const describeLink = document.querySelector('.popup__image-link')

addCardForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const nameValue = inputCardName.value;
  const linkValue = inputLink.value;
  document.placeInputForm.reset();
  renderCard({
    name: nameValue,
    link: linkValue

  })
  disableButton(addCardForm);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  disableButton(editForm);
});

function disableButton(form){
  const button = form.querySelector(".popup__button-save");
  button.classList.add("popup__button-save_disabled")
  button.setAttribute("disabled",'')
}

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//инпуты
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputLink = document.querySelector(".popup__input_card-link");

function openPopup(modal) {
  document.addEventListener('keydown', closeByEscape)
  modal.classList.add('popup_opened');
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopupEdit( editModal) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editModal);
}

const popups = document.querySelectorAll('.popup')
//обьединенная функция закрытия по крестику и оверлею.
popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

//слушатели
editProfileButton.addEventListener('click', () => openPopupEdit(editModal))
addCardButton.addEventListener('click', () => openPopup(addCardModal))


const cardsList = document.querySelector(".elements");
const cardTemplate = document.querySelector('.card-template').content;

//удаление карточки
function deleteHandler(e) {
  e.target.closest('.element').remove()
}

function createCard(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle = cardElement.querySelector('.element__group-title');
  const viewCardButton = cardElement.querySelector('.element__view-button');
  cardTitle.textContent = cardData.name;
  cardImage.src = `${cardData.link}`;
  cardImage.alt = cardData.name;

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__group-heart');

  function openPopupImage(viewCardModal) {
    describePlace.textContent = cardTitle.textContent;
    describeLink.src = cardImage.src;
    describeLink.alt = cardData.name;
    openPopup(viewCardModal)
  }

  deleteButton.addEventListener("click", deleteHandler)
  likeButton.addEventListener("click", likeClickHandler)
  viewCardButton.addEventListener('click', () => openPopupImage(viewCardModal))

  function likeClickHandler() {
    likeButton.classList.toggle('element__group-heart_active');
  }

  return cardElement;
}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);

}



const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".error-message",
  buttonSelector: ".popup__button-save",
  inputErrorClass: "popup__input-error",
  errorVisibleClass: "error-message_visible",
  inactiveButtonClass: "popup__button-save_disabled"

}

initialCards.forEach(renderCard);

const editFormValidator = new FormValidator(config,editForm)
const addCardFormValidator = new FormValidator(config,addCardForm)
editFormValidator.enableValidation()
addCardFormValidator.enableValidation()