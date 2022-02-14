import {openPopup, viewCardModal, describePlace, describeLink} from './utils.js'

export class Card {
  constructor(data, cardTemplateSelector) {
    this._data = data
    this._template= document.querySelector(cardTemplateSelector).content.querySelector('.element')

  }

  _openPopupImage(viewCardModal) {
    describePlace.textContent = this._cardTitle.textContent;
    describeLink.src = this._cardImage.src;
    describeLink.alt = this._data.name;
    openPopup(viewCardModal)
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click",  () =>  this._cardElement.remove())
    this._likeButton.addEventListener("click", this._likeClickHandler)
    this._viewCardButton.addEventListener('click', () => this._openPopupImage(viewCardModal))

  }

  _likeClickHandler() {
    this.classList.toggle('element__group-heart_active');
  }

  createCard() {

    this._element= this._template.querySelector('.element')

    this._cardElement = this._template.cloneNode(true);
    this._cardImage = this._cardElement.querySelector('.element__image');
    this._cardTitle = this._cardElement.querySelector('.element__group-title');
    this._viewCardButton = this._cardElement.querySelector('.element__view-button');
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = `${this._data.link}`;
    this._cardImage.alt = this._data.name;

    this._deleteButton = this._cardElement.querySelector('.element__delete-button');
    this._likeButton = this._cardElement.querySelector('.element__group-heart');

    this._setEventListeners()
    return this._cardElement;
  }
}


