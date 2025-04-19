import FormValidator from './FormValidator.js';
import Card from './card.js';
import { setupPopup, handleProfileFormSubmit, handlePopupImgOpen, handleAddCardFormSubmit } from './utils.js';

const openModal = document.querySelector('#popup-open');
const popup = document.querySelector('#popup');
const closeModal = document.querySelector('#popup-close');
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('#name');
const inputOcupation = document.querySelector('#ocupation');
const profileName = document.querySelector('.profile__about-name');
const profileOcupation = document.querySelector('.profile__about-ocupation');

const popupAddCard = document.querySelector('#popup-add-card');
const openModalCard = document.querySelector('#popup-button-add');
const closeModalCard = document.querySelector('#popup__close-add-card');

const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#url');
const cardTemplate = document.querySelector('#card-template');
const addCardForm = document.querySelector('#addCardForm');

let storeCards = [
    {
        id: 'img-1',
        name: 'Valle de Yosemite',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg',
        liked: false,
    },
    {
        id: 'img-2',
        name: 'Lago Louise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg',
        liked: false,
    },
    {
        id: 'img-3',
        name: 'Montañas Calvas',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg',
        liked: false,
    },
    {
        id: 'img-4',
        name: 'Latemar',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg',
        liked: false,
    },
    {
        id: 'img-5',
        name: 'Parque Nacional de la Vanoise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg',
        liked: false,
    },
    {
        id: 'img-6',
        name: 'Lago di Braies',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg',
        liked: false,
    },
];

//Abrir popups
setupPopup(openModal, popup, closeModal);
handleProfileFormSubmit(formElement, inputName, inputOcupation, profileName, profileOcupation, popup);

addCardForm.addEventListener('submit', function (event) {
    handleAddCardFormSubmit(event, inputTitle, inputLink, storeCards, () => cardManager.renderCards(), popupAddCard);
});
setupPopup(openModalCard, popupAddCard, closeModalCard);

// Crear validadores
const createValidator = (formSelector) => {
    const validator = new FormValidator({
        formSelector,
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__save-button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible',
    });
    validator.enableValidation();
    return validator;
};

const validatorProfile = createValidator('#profileForm');
const validatorAddCard = createValidator('#addCardForm');

const cardManager = new Card(storeCards, cardTemplate, handlePopupImgOpen);

// Mostrar tarjetas
cardManager.renderCards();
