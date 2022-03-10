import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards';
import Section from '../components/Section.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import {viewCardModal, describePlace, describeLink} from '../utils/utils';

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".error-message",
  buttonSelector: ".popup__button-save",
  inputErrorClass: "popup__input-error",
  errorVisibleClass: "error-message_visible",
  inactiveButtonClass: "popup__button-save_disabled"

}

const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const cardsList = document.querySelector(".elements");
const cardTemplateSelector = '.card-template'
const imagePopup = new PopupWithImage(viewCardModal);
const userInfo = new UserInfo(profileName, profileJob);
const info = userInfo.getUserInfo();
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);



const editFormPopup = new PopupWithForm(editModal, (GetValues) => {
  const values = GetValues();
  userInfo.setUserInfo(values);
  editFormPopup.close();
});
const addFormPopup = new PopupWithForm(addCardModal, (GetValues) => {
  const values = GetValues();
  const cardElement = createCard(values);
  defaultCardList.addItem(cardElement)
  addFormPopup.close();
  addCardFormValidator.disableButton();
});

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item)
    defaultCardList.addItem(cardElement);
  },
}, cardsList);

imagePopup.setEventListeners();

inputName.value = info.name;
inputJob.value = info.job;

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
editProfileButton.addEventListener('click', () => editFormPopup.open())
addCardButton.addEventListener('click', () => addFormPopup.open())

editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

defaultCardList.render();

function createCard(info) {
  const card = new Card({
    name: info['input-place'],
    link: info['input-link']

  }, cardTemplateSelector, () => {
    imagePopup.open(info['input-link'], info['input-place'])
  })
  const cardElement = card.createCard();
  return cardElement;
}