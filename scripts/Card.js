import api from './Api.js';
export default class Card {
    constructor(cardData, cardTemplate, handlePopupImgOpen, popupConfirmDelete, userId) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate;
        this._handlePopupImgOpen = handlePopupImgOpen;
        this._popupConfirmDelete = popupConfirmDelete;
        this._userId = userId;
    }

    _getTemplate() {
        return this._cardTemplate.content.querySelector('.card').cloneNode(true);
    }

    _setEventListeners(cardElement) {
        // Like
        const likeButton = cardElement.querySelector('.card__text-button-like');

        // Estado inicial
        if (this._cardData.isLiked) {
            likeButton.classList.add('card__text-button-like-active');
        }

        likeButton.addEventListener('click', () => {
            if (!this._cardData.isLiked) {
                api.likeCard(this._cardData._id)
                    .then((updatedCard) => {
                        this._cardData.isLiked = true;
                        likeButton.classList.add('card__text-button-like-active');
                    })
                    .catch((err) => console.error('Error al dar like:', err));
            } else {
                api.unLikeCard(this._cardData._id)
                    .then((updatedCard) => {
                        this._cardData.isLiked = false;
                        likeButton.classList.remove('card__text-button-like-active');
                    })
                    .catch((err) => console.error('Error al quitar like:', err));
            }
        });

        // Delete
        const deleteButton = cardElement.querySelector('.card__delete-icon');
        if (this._cardData.owner !== this._userId) {
            deleteButton.style.display = 'none';
        } else {
            deleteButton.addEventListener('click', () => {
                this._popupConfirmDelete.setSubmitAction(() => {
                    api.deleteCard(this._cardData._id)
                        .then(() => {
                            cardElement.remove();
                            this._popupConfirmDelete.close();
                        })
                        .catch((err) => console.error('Error al eliminar la tarjeta', err));
                });
                this._popupConfirmDelete.open();
            });
        }

        // Open image
        const cardImage = cardElement.querySelector('.card__img-url');
        cardImage.addEventListener('click', () => {
            this._handlePopupImgOpen({ name: this._cardData.name, link: this._cardData.link });
        });
    }

    _createCard() {
        const cardElement = this._getTemplate();

        // Verifica si _cardData y sus propiedades están definidas
        if (!this._cardData || !this._cardData.link || !this._cardData.name) {
            console.error('Error: Faltan datos en cardData', this._cardData);
            return; // Si no hay datos válidos, no se crea la carta
        }

        const cardImage = cardElement.querySelector('.card__img-url');
        cardImage.src = this._cardData.link;
        cardImage.alt = this._cardData.name;

        cardElement.querySelector('.card__text').textContent = this._cardData.name;

        this._setEventListeners(cardElement);

        return cardElement;
    }

    createCard() {
        return this._createCard();
    }
}
