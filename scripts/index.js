const editModal = document.querySelector(".popup_type_edit");
const addCardModal = document.querySelector(".popup_type_add-card");
const closeAddCardModalButton = addCardModal.querySelector('.popup__close');
const closeEditModal = editModal.querySelector('.popup__close');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const editForm = editModal.querySelector('.popup__form');
const addCardForm = addCardModal.querySelector('.popup__form');
const viewCardModal = document.querySelector('.popup_type_image-container');
const CloseViewCardModal = viewCardModal.querySelector('.popup__close');

addCardForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const nameValue = inputCardName.value;
  const linkValue = inputLink.value;
  document.placeInputForm.reset();
  renderCard({
    name: nameValue,
    link: linkValue

  })
  console.log(name)
  closePopupKeyEcs(event, addCardModal);
});

editForm.addEventListener('submit', (event) => {
  event.preventDefault()
  profileName.textContent = inputName.value;
  profileJob.textContent = inputJob.value;
  closePopupKeyEcs(event,editModal);
});


const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//инпуты
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const inputCardName = document.querySelector(".popup__input_type_card-name");
const inputLink = document.querySelector(".popup__input_card-link");

function openPopup(modal) {
  document.addEventListener('keydown', (event) => closePopupKeyEcs(event, modal))

  modal.classList.add('popup_opened');
}

function closePopupKeyEcs(event, modal) {
  if (event.keyCode && event.keyCode === 27 ) {
    modal.classList.remove('popup_opened');
    return;
  }

  if (event.target === event.currentTarget) {
    modal.classList.remove('popup_opened');
    return;
  }
  document.removeEventListener('keydown', (event) => closePopupKeyEcs(event, modal))
}

function openPopupEdit(editModal) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editModal);
}
//слушатели
editProfileButton.addEventListener('click', () => openPopupEdit(editModal))
editModal.addEventListener('click', (event) => closePopupKeyEcs(event, editModal))
closeEditModal.addEventListener('click', (event) => closePopupKeyEcs(event,editModal))
addCardButton.addEventListener('click', () => openPopup(addCardModal))
closeAddCardModalButton.addEventListener('click', (event) => closePopupKeyEcs(event,addCardModal))
addCardModal.addEventListener('click', (event) => closePopupKeyEcs(event, addCardModal))
CloseViewCardModal.addEventListener('click', (event) => closePopupKeyEcs(event,viewCardModal))
viewCardModal.addEventListener('click', (event) => closePopupKeyEcs(event, viewCardModal))

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

  const deleteButton = cardElement.querySelector('.element__delete-button');
  const likeButton = cardElement.querySelector('.element__group-heart');

  function openPopupImage(viewCardModal) {
    document.querySelector('.popup__place-name').textContent = cardTitle.textContent;
    document.querySelector('.popup__image-link').src = cardImage.src;
    openPopup(viewCardModal)
  }

  deleteButton.addEventListener("click", deleteHandler)
  likeButton.addEventListener("click", likeClickHandler)
  viewCardButton.addEventListener('click', () => openPopupImage(viewCardModal))

  function likeClickHandler() {
    likeButton.classList.toggle('element__group-heart_active');
  }

  cardsList.prepend(cardElement);
  return cardElement;

}

function renderCard(cardData) {
  const cardElement = createCard(cardData);
  cardsList.prepend(cardElement);

}


initialCards.forEach(renderCard);



editForm.addEventListener('submit', function (evt) {
  // Отменим стандартное поведение
  evt.preventDefault();
});

