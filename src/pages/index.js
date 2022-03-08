import {Card} from '../../src/components/Card';
import {FormValidator} from '../../src/components/FormValidator.js';
import {openPopup, closePopup} from '../../src/utils/utils';
import {initialCards} from '../../src/utils/initialCards';
import  Section  from '../../src/components/Section.js';
import '../index.css';


const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');


addCardForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const nameValue = inputCardName.value;
  const linkValue = inputLink.value;
  addCardForm.reset();
  createCard( nameValue, linkValue);
  /*renderCard({
    name: nameValue,
    link: linkValue

  })*/
  disableButton(addCardForm);
  closePopup(addCardModal);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  disableButton(editForm);
  closePopup(editModal)
});

function disableButton(form) {
  const button = form.querySelector(".popup__button-save");
  button.classList.add("popup__button-save_disabled")
  button.setAttribute("disabled", '')
}

const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//инпуты
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputLink = document.querySelector(".popup__input_card-link");





function openPopupEdit(editModal) {
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
const cardTemplateSelector = '.card-template'


/*function renderCard(data) {
  const card = new Card(data, cardTemplateSelector)
  const cardElement = card.createCard()
  cardsList.prepend(cardElement);

}*/


const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".error-message",
  buttonSelector: ".popup__button-save",
  inputErrorClass: "popup__input-error",
  errorVisibleClass: "error-message_visible",
  inactiveButtonClass: "popup__button-save_disabled"

}

//initialCards.forEach(defaultCardList);


const editFormValidator = new FormValidator(config, editForm)
const addCardFormValidator = new FormValidator(config, addCardForm)
editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

const defaultCardList = new Section({ items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector)
    const cardElement = card.createCard()
    cardsList.prepend(cardElement);
  }, }, cardsList);

defaultCardList.render();


function createCard(nameValue,linkValue){
  const card = new Card({
    name: nameValue,
    link: linkValue

  }, cardTemplateSelector)
  const cardElement = card.createCard()
  defaultCardList.addItem(cardElement)

}