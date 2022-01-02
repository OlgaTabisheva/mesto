
const editModal = document.querySelector(".popup_type_edit")
const addCardModal = document.querySelector(".popup_type_add-card")
const closeAddCardModalButton = addCardModal.querySelector('.popup__close');
const closeEditModal = editModal.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

/* let profileName = document.querySelector('.profile__name');
 let profileJob = document.querySelector('.profile__job');
 let nameInput = document.querySelector('.popup__input_type_name');
 let jobInput = document.querySelector('.popup__input_type_job');
 let formElement = document.querySelector('.popup__form');*/

  // function openPopupEdit() {
  //   editModal.classList.add('popup_opened');
  //   nameInput.value = profileName.textContent;
  //   jobInput.value = profileJob.textContent;
  // }
  //
  //
  // function openPopupAdd() {
  //   addCardModal.classList.add('popup_opened');
  // }
  //
  // function closePopup() {
  //   editModal.classList.remove('popup_opened');
  // }
  //
  // function formSubmitHandler(evt) {
  //   evt.preventDefault();
  //   profileName.textContent = nameInput.value;
  //   profileJob.textContent = jobInput.value;
  //   closePopup();
  // }
  //
  // formElement.addEventListener('submit', formSubmitHandler);
  // popupOpenButton.addEventListener('click', openPopupEdit);
  // popupOpenButtonAdd.addEventListener('click', openPopupAdd);
  // popupCloseButton.addEventListener('click', closePopup);

function toogleModal(modal){
  modal.classList.toggle('popup_opened')
}
editProfileButton.addEventListener('click', () => toogleModal(editModal))
closeEditModal.addEventListener('click', () => toogleModal(editModal))

addCardButton.addEventListener('click', () => toogleModal(addCardModal))
closeAddCardModalButton.addEventListener('click', () => toogleModal(addCardModal))

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const list = document.querySelector(".elements");
const cardTemplate = document.querySelector('.card__template').content;

initialCards.forEach(function (cardData){
  console.log("cardData", cardData);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle= cardElement.querySelector('.element__group-title');
  cardTitle.textContent = cardData.name;
  cardImage.src = `${cardData.link}`;
  console.log("element__image", cardImage);
  console.log("element__group-title", cardTitle);
  list.prepend(cardElement);

})

