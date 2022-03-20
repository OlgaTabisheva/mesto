import {viewCardModal, describePlace, describeLink} from '../utils/utils';
import {open} from '../components/Popup'

export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick, handleLikeClick) {
    this._data = data;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._template = document.querySelector(cardTemplateSelector).content.querySelector('.element');
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;

  }

  deleteCard() {
    this._cardElement.remove()
    this._cardElement = null;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => this._handleDeleteClick(this._id))
    this._likeButton.addEventListener("click", this._likeClickHandler)
    this._viewCardButton.addEventListener('click', () => this._handleCardClick())

  }

  _likeClickHandler() {
    this.classList.toggle('element__group-heart_active');
  }

  _setLikes() {
    const LikeCountElement = this._cardElement.querySelector('.element__like-count')
    LikeCountElement.textContent = this._likes.length
  }

  createCard() {

    this._element = this._template.querySelector('.element')

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
    if (this._likes)
      this._setLikes()
    if (this._ownerId !== this._userId) {
      this._cardElement.querySelector('.element__delete-button').style.display = 'none'
    }
    return this._cardElement;
  }
}


