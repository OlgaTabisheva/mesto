const popupOpenButton = document.querySelector( '.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.popup__save');
const popup = document.querySelector( '.popup');


function openPopup() {
    popup.classList.add( 'popup_opened');
}
function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup() {
    let formElement = document.querySelector( '.popup__container');
    let ProfileName = document.querySelector('.profile__name');
    let ProfileJob = document.querySelector('.profile__job');
    console.log(ProfileName.textContent); // "Это текст внутри элемента."
    console.log(ProfileJob.textContent); // "Это текст внутри элемента."

    function formSubmitHandler (evt) {

        evt.preventDefault();

        let nameInput = document.querySelector( '.popup__name');
        let jobInput = document.querySelector( '.popup__job');
        document.querySelector('.profile__name').textContent = nameInput.value;
        document.querySelector('.profile__job').textContent = jobInput.value;
    }

    formElement.addEventListener('submit', formSubmitHandler);
    popup.classList.remove('popup_opened');
}


popupOpenButton.addEventListener( 'click', openPopup);
popupCloseButton.addEventListener ( 'click' , closePopup);
popupSaveButton.addEventListener ( 'click' , savePopup);










