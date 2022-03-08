import Popup from './../components/Popup';


export default class PopupWithImage extends Popup {
  constructor ( popupSelector) {
    super(popupSelector);
    this._imageLink = this._popupSelector.querySelector('.popup__image-link');
    this._placeName = this._popupSelector.querySelector('.popup__place-name');
  }



  open(link, name) {
     this._imageLink.src = link;
     this._placeName.name = name;
     this._imageLink.alt = name;
     super.open();

 }
}