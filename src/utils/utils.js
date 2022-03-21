export const viewCardModal = document.querySelector('.popup_type_image-container');
export const describePlace = document.querySelector('.popup__place-name')
export const describeLink = document.querySelector('.popup__image-link')


export default function changeButtonText({popup, buttonSelector, isLoading}) {
  const button = popup.querySelector(buttonSelector);
  if (isLoading) {
    changeButtonText.oldText = button.textContent
    button.textContent = 'Сохранение...'
  } else {
    button.textContent = changeButtonText.oldText;
  }

}
