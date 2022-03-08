import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js';
import {open, close} from '../components/Popup';
import {initialCards} from '../utils/initialCards';
import Section from '../components/Section.js';
import Popup from '../components/Popup';
import './index.css';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
export const viewCardModal = document.querySelector('.popup_type_image-container');
export const describePlace = document.querySelector('.popup__place-name')
export const describeLink = document.querySelector('.popup__image-link')


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
const popups = document.querySelectorAll('.popup')
const cardsList = document.querySelector(".elements");
const cardTemplateSelector = '.card-template'

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
const imagePopup = new PopupWithImage(viewCardModal);
imagePopup.setEventListeners();

const userInfo = new UserInfo(profileName, profileJob);
const info = userInfo.getUserInfo();
inputName.value = info.name;
inputJob.value = info.job;

const editFormPopup = new PopupWithForm(editModal, () => {
  editFormPopup._getInputValues();
  const name = editFormPopup._formData['input-name'];
  const job = editFormPopup._formData['input-job'];
  userInfo.setUserInfo(name, job);
  editFormPopup.close();
});
const addFormPopup = new PopupWithForm(addCardModal, () => {
  addFormPopup._getInputValues();
  const nameValue = addFormPopup._formData['input-place'];
  const linkValue = addFormPopup._formData['input-link'];
  createCard(nameValue, linkValue);
  addFormPopup.close();
});
editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
editProfileButton.addEventListener('click', () => editFormPopup.open())
addCardButton.addEventListener('click', () => addFormPopup.open())

const editFormValidator = new FormValidator(config, editForm)
const addCardFormValidator = new FormValidator(config, addCardForm)
editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, cardTemplateSelector, () => {
      imagePopup.open(item.link, item.name)
    })
    const cardElement = card.createCard()
    cardsList.prepend(cardElement);
  },
}, cardsList);

defaultCardList.render();

function createCard(nameValue, linkValue) {
  const card = new Card({
    name: nameValue,
    link: linkValue

  }, cardTemplateSelector, () => {
    imagePopup.open(linkValue, nameValue)
  })
  const cardElement = card.createCard()
  defaultCardList.addItem(cardElement)

}