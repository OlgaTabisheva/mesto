export const viewCardModal = document.querySelector('.popup_type_image-container');
export const describePlace = document.querySelector('.popup__place-name')
export const describeLink = document.querySelector('.popup__image-link')

export function openPopup(modal) {
  document.addEventListener('keydown', closeByEscape)
  modal.classList.add('popup_opened');
}

export function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

export function closePopup(modal) {
  modal.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}