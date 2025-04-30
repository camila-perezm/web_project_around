export default class Card {
    constructor(cardData, cardTemplate, handlePopupImgOpen) {
        this._cardData = cardData;
        this._cardTemplate = cardTemplate;
        this._handlePopupImgOpen = handlePopupImgOpen;
    }

    _getTemplate() {
        return this._cardTemplate.content.querySelector('.card').cloneNode(true);
    }

    _setEventListeners(cardElement) {
        // Like
        const likeButton = cardElement.querySelector('.card__text-button-like');
        likeButton.addEventListener('click', () => {
            likeButton.classList.toggle('card__text-button-like-active');
        });

        // Delete
        const deleteButton = cardElement.querySelector('.card__delete-icon');
        deleteButton.addEventListener('click', () => {
            cardElement.remove(); // Simplemente eliminar el nodo del DOM
        });

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
