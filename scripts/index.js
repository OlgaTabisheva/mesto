const popupOpenButton = document.querySelector( '.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popup = document.querySelector( '.popup');


function openPopup() {
    popup.classList.add( 'popup_opened');
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener( 'click', openPopup);
popupCloseButton.addEventListener ( 'click' , closePopup);

let formElement = document.querySelector( '.popup__container');

function formSubmitHandler (evt) {
     evt.preventDefault();
    let nameInput = document.querySelector( '.popup__name');
    let jobInput = document.querySelector( '.popup__job');
    document.querySelector('.profile__name').textContent = nameInput.value;
    document.querySelector('.profile__job').textContent = jobInput.value;
}

formElement.addEventListener('submit', formSubmitHandler);