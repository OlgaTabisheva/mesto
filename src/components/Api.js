class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers
    this._baseUrl = baseUrl
    // тело конструктора
  }

  getProfile() {

    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject((res.status)))
      .catch(console.log)
  }


  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(res => res.ok ? res.json() : Promise.reject((res.status)))
      .catch(console.log)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject((res.status)))
      .catch(console.log)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
      .then(res => res.ok ? res.json() : Promise.reject((res.status)))
      .catch(console.log)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(res => res.ok ? res.json() : Promise.reject((res.status)))
      .catch(console.log)
  }

  // другие методы работы с API
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '02df6ff4-2e7c-4c41-a91c-33f97923bd9a',
    'Content-Type': 'application/json'
  }
});
