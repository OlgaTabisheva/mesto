import {Card} from '../components/Card';
import {FormValidator} from '../components/FormValidator.js';
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
  }).catch(console.log)

api.getInitialCards()
  .then(cardlist => {
    cardlist.reverse().forEach(info => {
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
  }).catch(console.log)


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
const avatarCardForm = avatarCardModal.querySelector('.popup__form');
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

const editFormValidator = new FormValidator(config, editForm);
const addCardFormValidator = new FormValidator(config, addCardForm);
const avatarFormValidator = new FormValidator(config, avatarCardForm);

const editFormPopup = new PopupWithForm(editModal, (info) => {
  changeButtonText({isLoading: true, popup: editModal, buttonSelector: buttonselector});
  const name = info['input-name']
  const about = info['input-job']

  api.editProfile(name, about)
    .then(res => {
      userInfo.setUserInfo(name, about);
      editFormPopup.close();
    })

    .finally(() => {
      changeButtonText({isLoading: false, popup: editModal, buttonSelector: buttonselector});
    })


});
const addFormPopup = new PopupWithForm(addCardModal, values => {
  changeButtonText({isLoading: true, popup: addCardModal, buttonSelector: buttonselector});
  api.addCard(values['input-place'], values['input-link'])
    .then(res => {
      Object.assign(values, res)
      const cardElement = createCard(values);
      defaultCardList.addItem(cardElement);
      addFormPopup.close();
      addCardFormValidator.disableButton();
    })
    .finally(() => {
      changeButtonText({isLoading: false, popup: addCardModal, buttonSelector: buttonselector});
    })

});

const conformPopup = new PopupWithForm(deleteCardModal)
const avatarPopup = new PopupWithForm(avatarCardModal, info => {
  changeButtonText({isLoading: true, popup: avatarCardModal, buttonSelector: buttonselector});
  const link = info['input-link']
  api.editAvatar(link)
    .then(res => {
      userInfo.setUserInfo(res.name, res.about, res.avatar)
      avatarPopup.close();
    })
    .finally(() => {
      changeButtonText({isLoading: false, popup: avatarCardModal, buttonSelector: buttonselector});
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



editFormPopup.setEventListeners();
addFormPopup.setEventListeners();
editProfileButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  inputName.value = info.name;
  inputJob.value = info.about;
  editFormPopup.open()})

addCardButton.addEventListener('click', () => addFormPopup.open())
avatarProfileButton.addEventListener('click', () => avatarPopup.open())


editFormValidator.enableValidation()
addCardFormValidator.enableValidation()
avatarFormValidator.enableValidation()

defaultCardList.render();

function createCard(info) {
  const card = new Card({
      name: info['input-place'],
      link: info['input-link'],
      likes: info.likes,
      id: info.id ? info.id : info._id,
      userId: info.userId ? info.userId : info.owner._id,
      ownerId: info.ownerId ? info.ownerId: info.owner._id

    }, cardTemplateSelector, () => {
      imagePopup.open(info['input-link'], info['input-place'])
    }, (id) => {
      conformPopup.open();
      conformPopup.changeSubmitHandler(() => {
        api.deleteCard(id)
          .then(res => {
            card.deleteCard();
            conformPopup.close();
          }).catch(console.log)

      })
    }, (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          }).catch(console.log)
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          }).catch(console.log)
      }

    }
  )
  const cardElement = card.createCard();
  return cardElement;
}
