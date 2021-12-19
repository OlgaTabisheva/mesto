const popupOpenButton = document.querySelector( '.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');
const popupSaveButton = document.querySelector('.button-save');
const popup = document.querySelector( '.popup');
const popupForm = document.querySelector( '.popup2');


function openPopup() {
    popup.classList.add( 'popup_opened');
    let ProfileName = document.querySelector('.profile__name');
    let ProfileJob = document.querySelector('.profile__job');
    document.querySelector('.popup__name').value = ProfileName.textContent;
    document.querySelector('.popup__job').value = ProfileJob.textContent;
}

function closePopup() {
    popup.classList.remove('popup_opened');
}

function savePopup() {
    let formElement = document.querySelector( '.popup__container');
    function formSubmitHandler (evt) {

        evt.preventDefault();
        let nameInput = document.querySelector( '.popup__name');
        let jobInput = document.querySelector( '.popup__job');
      ;
        document.querySelector('.profile__name').textContent = nameInput.value;
        document.querySelector('.profile__job').textContent = jobInput.value;
    }

    formElement.addEventListener('submit', formSubmitHandler);

    popup.classList.remove('popup_opened');
}

popupOpenButton.addEventListener( 'click', openPopup);
popupCloseButton.addEventListener ( 'click' , closePopup);
popupSaveButton.addEventListener ( 'click' , savePopup);

const popupAddButton = document.querySelector( '.Add-button');



function openPopup2() {
    popupForm.classList.add( 'popup2_opened');

}

popupAddButton.addEventListener( 'click', openPopup2);

