export default class UserInfo {
  constructor(nameSelector, jobSelector, profileAvatarSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._avatar =profileAvatarSelector;

  }

  getUserInfo() {
    return {name: this._nameSelector.textContent, about: this._jobSelector.textContent/*, link: this._profileAvatarSelector.src*/};
  }

  setUserInfo(name, about,avatar) {
    this._nameSelector.textContent = name;
    this._jobSelector.textContent = about;
    if (avatar)
    {this._avatar.src =avatar;}
  }
}


