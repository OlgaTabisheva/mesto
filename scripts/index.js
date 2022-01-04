const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const closeAddCardModalButton = addCardModal.querySelector('.popup__close');
const closeEditModal = editModal.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');



addCardForm.addEventListener('submit', (event) =>{
  event.preventDefault()
  const nameValue = inputCardName.value;
  const linkValue = inputLink.value;
  document.placeInputForm.reset();

  createCard({

    name: nameValue,
    link: linkValue
  })
  toogleModal(addCardModal);
});

editForm.addEventListener('submit', (event) =>{
  event.preventDefault()
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  toogleModal(editModal);

});


let profileName = document.querySelector('.profile__name');
 let profileJob = document.querySelector('.profile__job');

 //инпуты
 let inputName = document.querySelector('.popup__input_type_name');
 let inputJob = document.querySelector('.popup__input_type_job');
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputLink = document.querySelector(".popup__input_card-link");


function toogleModal(modal){

  modal.classList.toggle('popup_opened')

}
function openPopupEdit() {
   editModal.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
 }


editProfileButton.addEventListener('click', () => openPopupEdit())
closeEditModal.addEventListener('click', () => toogleModal(editModal))

addCardButton.addEventListener('click', () => toogleModal(addCardModal))
closeAddCardModalButton.addEventListener('click', () => toogleModal(addCardModal))


//CloseViewCardModal.addEventListener('click', () => toogleModal(viewCardModal))

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
    name: 'Санкт-Петербург',
    link: 'https://images.unsplash.com/photo-1630354102354-2471c8851e60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
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

//удаление карточки
function deleteHandler(e){
  e.target.closest('.element').remove()
}



function createCard (cardData){
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.element__image');
  const cardTitle= cardElement.querySelector('.element__group-title');
  const deleteButton= cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.element__group-heart');


  cardTitle.textContent = cardData.name;
  cardImage.src = `${cardData.link}`;


  deleteButton.addEventListener("click", deleteHandler)
  likeButton.addEventListener("click", likeClickHandler)

  function likeClickHandler(){
    likeButton.classList.toggle('element__group-heart_active');
  }

  list.prepend(cardElement);
  function openPopup(viewCardModal) {
    viewCardModal.classList.add('popup_opened');
    document.querySelector('.popup__place-name').textContent= cardTitle.textContent;
    document.querySelector('.popup__image-link').src = cardImage.src;
  }
// Функция закрытия viewCardModal реализована таким образом, т.к. внешний toogleModal на закрытие не работает.
   function closePopup(viewCardModal) {
     viewCardModal.classList.remove('popup_opened');
 }

  const viewCardModal = document.querySelector('.popup_type-image-container');
  const viewCardButton = document.querySelector('.card__view-button');
  const CloseViewCardModal = viewCardModal.querySelector('.popup__close');

  viewCardButton.addEventListener('click', () => openPopup(viewCardModal))
  CloseViewCardModal.addEventListener('click', () => closePopup(viewCardModal))
}
initialCards.forEach(createCard);


//сделать третье модальное окно.

//Плавное открытие и закрытие попапов