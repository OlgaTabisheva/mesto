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

  document.addEventListener('click', closePopupOverlay)
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function closePopup(modal) {
  modal.classList.remove('popup_opened');
}

function closePopupOverlay(event){
  if (event.target === event.currentTarget) {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
    return;
  }
}
function openPopupEdit( editModal) {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  openPopup(editModal);
}

//слушатели
editProfileButton.addEventListener('click', () => openPopupEdit(editModal))
editModal.addEventListener('click', (event) => closePopupOverlay(event, editModal))
closeEditModal.addEventListener('click', () => closePopup(editModal))
addCardButton.addEventListener('click', () => openPopup(addCardModal))
closeAddCardModalButton.addEventListener('click', () => closePopup(addCardModal))
addCardModal.addEventListener('click', (event) => closePopupOverlay(event, addCardModal))
CloseViewCardModal.addEventListener('click', () => closePopup(viewCardModal))
viewCardModal.addEventListener('click', (event) => closePopupOverlay(event, viewCardModal))

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
    describePlace.textContent = cardTitle.textContent;
    describeLink.src = cardImage.src;
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

initialCards.forEach(renderCard);

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  errorSelector: ".error-message",
  buttonSelector: ".popup__button-save",
  inputErrorClass: "popup__input-error",
  errorVisibleClass: "error-message_visible",
  inactiveButtonClass: "popup__button-save_disabled"

});