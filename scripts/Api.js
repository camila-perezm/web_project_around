class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    _response = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
    };

    //Método para obtener las tarjetas iniciales
    getInitialCards() {
        return fetch(`${this._baseURL}/cards`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._response);
    }

    addCard(data) {
        return fetch(`${this._baseURL}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link,
            }),
        }).then(this._response);
    }

    updateUserInfo(data) {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.occupation,
            }),
        }).then(this._response);
    }

    getUserInfo() {
        return fetch(`${this._baseURL}/users/me`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._response);
    }

    likeCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        }).then(this._response);
    }

    unLikeCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._response);
    }

    deleteCard(cardId) {
        return fetch(`${this._baseURL}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        }).then(this._response);
    }

    updateAvatar(data) {
        return fetch(`${this._baseURL}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatar, // aquí va la URL de la nueva imagen
            }),
        }).then(this._response);
    }
}

const api = new Api({
    baseUrl: 'https://around-api.es.tripleten-services.com/v1',
    headers: {
        authorization: '21fe9b3d-75a4-496e-a731-7b77a18efff6',
        'Content-Type': 'application/json',
    },
});

export default api;
