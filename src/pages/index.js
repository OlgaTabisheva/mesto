import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards';
import Section from '../components/Section.js';
import './index.css';
import PopupWithImage from '../components/PopupWithImage';
import PopupWithForm from '../components/PopupWithForm';
import UserInfo from '../components/UserInfo';
import {viewCardModal, describePlace, describeLink} from '../utils/utils';
import {api} from '../components/Api'
import changeButtonText from '../utils/utils'


let userId
api.getProfile()
  .then(res => {
    userInfo.setUserInfo(res.name, res.about, res.avatar)

    userId = res._id
  })

api.getInitialCards()
  .then(cardlist => {
    cardlist.forEach(info => {
      const card = createCard({
        'input-place': info['name'],
        'input-link': info['link'],
        likes: info.likes,
        id: info._id,
        userId: userId,
        ownerId: info.owner._id
      })


      defaultCardList.addItem(card)
    })
  })


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
const deleteCardModal = document.querySelector(".popup_type_delete-card");
const avatarCardModal = document.querySelector(".popup_type_avatar");
const editProfileButton = document.querySelector('.profile__edit-button');
const avatarProfileButton = document.querySelector('.profile__avatar-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAvatar = document.querySelector('.profile__avatar');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const cardsList = document.querySelector(".elements");
const buttonselector = '.popup__button-save';
const cardTemplateSelector = '.card-template'
const imagePopup = new PopupWithImage(viewCardModal);
const userInfo = new UserInfo(profileName, profileJob, profileAvatar);
const info = userInfo.getUserInfo();
const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);


const editFormPopup = new PopupWithForm(editModal, (GetValues) => {
  changeButtonText({isLoading: true, popup: editModal, buttonSelector: buttonselector});
  const info = GetValues();
  const name = info['input-name']
  const about = info['input-job']

  api.editProfile(name, about)
    .then(res => {
      console.log('res', name)
      userInfo.setUserInfo(name, about);
    })
    .finally(() => {
      changeButtonText({isLoading: false, popup: editModal, buttonSelector: buttonselector});
      editFormPopup.close();
    })

  editFormPopup.close();
});
const addFormPopup = new PopupWithForm(addCardModal, GetValues => {
  const values = GetValues();

  api.addCard(values['input-place'], values['input-link'])
    .then(res => {
      Object.assign(values, res)
    })
  const cardElement = createCard(values);
  defaultCardList.addItem(cardElement)
  addFormPopup.close();
  addCardFormValidator.disableButton();
});

const conformPopup = new PopupWithForm(deleteCardModal)
const avatarPopup = new PopupWithForm(avatarCardModal, GetValues => {
  const info = GetValues();
  console.log(info)
  const link = info['input-link']
  api.editAvatar(link)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
    })
})

conformPopup.setEventListeners();
avatarPopup.setEventListeners();

const defaultCardList = new Section({
  items: [],
  renderer: (item) => {
    const cardElement = createCard(item)
    defaultCardList.addItem(cardElement);
  },
}, cardsList);

imagePopup.setEventListeners();

inputName.value = info.name;
inputJob.value = info.about;

editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
editProfileButton.addEventListener('click', () => editFormPopup.open())
addCardButton.addEventListener('click', () => addFormPopup.open())
avatarProfileButton.addEventListener('click', () => avatarPopup.open())


editFormValidator.enableValidation()
addCardFormValidator.enableValidation()

defaultCardList.render();

function createCard(info) {
  const card = new Card({
      name: info['input-place'],
      link: info['input-link'],
      likes: info.likes,
      id: info.id,
      userId: userId,
      ownerId: info['ownerId']

    }, cardTemplateSelector, () => {
      imagePopup.open(info['input-link'], info['input-place'])
    }, (id) => {
      conformPopup.open();
      conformPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard();
            conformPopup.close();
          })

      })
    }, (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
      }

    }
  )
  const cardElement = card.createCard();
  return cardElement;
}
