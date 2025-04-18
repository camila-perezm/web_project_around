//import { handlePopupImgOpen } from './utils.js';

export default class Card {

constructor (storeCards, cardTemplate, handlePopupImgOpen) {
    this._storeCards = storeCards;
    this._cardTemplate = cardTemplate;
    this.handlePopupImgOpen = handlePopupImgOpen;
}

_toggleLike(cardId) {
    const card = this._storeCards.find((card) => card.id === cardId);
    card.liked = !card.liked;
    this.renderCards();
}

 _deleteCard(cardId) {
    this._storeCards = this._storeCards.filter((card) => card.id !== cardId);
    this.renderCards();
 }

_createCard(card) {
    const newNode = this._cardTemplate.content.querySelector('.card').cloneNode(true);

    newNode.querySelector('.card__img-url').src = card.link;
    newNode.querySelector('.card__img-url').alt = card.name;
    newNode.querySelector('.card__text').textContent = card.name;
    newNode.id = card.id;

    newNode.querySelector('.card__delete-icon').addEventListener('click', () => {
      this._storeCards = this._storeCards.filter((c) => c.id !== card.id);
      this.renderCards();
    });

    newNode.querySelector('.card__text-button-like').addEventListener('click', function () {
      card.liked = !card.liked;
      newNode.querySelector('.card__text-button-like').classList.toggle('card__text-button-like-active', card.liked);
    });

    newNode.querySelector('.card__img-url').addEventListener('click', () => {
      this.handlePopupImgOpen(card.id, this._storeCards);
    });
    return newNode;
}

renderCards() {
    const cardsContainer = document.querySelector('#cards');
    cardsContainer.innerHTML = '';

    this._storeCards.forEach((card) => {
      const newNode = this._createCard(card);
      if (card.liked) {
        newNode.querySelector('.card__text-button-like').classList.add('card__text-button-like-active');
      }
      cardsContainer.append(newNode);
    });
    
}
}
