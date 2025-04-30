import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';

//Elementos del DOM
const openModal = document.querySelector('#popup-open');
const inputName = document.querySelector('#name');
const inputOccupation = document.querySelector('#occupation');
const openModalCard = document.querySelector('#popup-button-add');
const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#url');
const cardTemplate = document.querySelector('#card-template');

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

// Botón para abrir el popup de editar perfil
openModal.addEventListener('click', () => {
    inputName.value = '';
    inputOccupation.value = '';
    profilePopup.open();
});

// Botón para abrir el popup de agregar nueva carta
openModalCard.addEventListener('click', () => {
    inputTitle.value = '';
    inputLink.value = '';
    addCardPopup.open();
});

//Crea instancia de UserInfo
const userInfo = new UserInfo({
    nameSelector: '.profile__about-name',
    occupationSelector: '.profile__about-occupation',
});

//Función para manejar el envío del formulario de perfil
const handleProfileFormSubmit = (inputValues) => {
    const { name, occupation } = inputValues;
    userInfo.setUserInfo(name, occupation); // Actualiza los datos del perfil
    profilePopup.close(); // Cierra el popup
};

// Crea instancia de PopupWithForm para el formulario de perfil
const profilePopup = new PopupWithForm('#popup', handleProfileFormSubmit);
profilePopup.setEventListeners();

// Crear la instancia de PopupWithForm para agregar nueva carta
const addCardPopup = new PopupWithForm('#popup-add-card', (inputValues) => {
    const { title, url } = inputValues;

    // Genera id aleatorio para la nueva carta
    const newCard = {
        id: 'img-' + Math.random().toString(36).substring(2, 5),
        name: title,
        link: url,
        liked: false,
    };

    // Agrega la nueva carta al array de storeCards
    storeCards.push(newCard);

    // Crea la carta directamente y añade a la sección sin renderizar todo de nuevo
    const card = new Card(newCard, cardTemplate, (data) => {
        imagePopup.open(data); // Abre el popup con la imagen de la carta
    });

    // Añade la nueva carta al DOM
    cardManager.addItem(card.createCard());

    // Cierra el popup
    addCardPopup.close();
});

addCardPopup.setEventListeners();

// Crea instancia de PopupWithImage
const imagePopup = new PopupWithImage('#popup-image');
imagePopup.setEventListeners();

// Crea validadores
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

// Crea la clase Section para manejar las cartas
const cardManager = new Section(
    {
        items: storeCards,
        renderer: (cardData) => {
            const card = new Card(cardData, cardTemplate, (data) => {
                imagePopup.open(data); // Abre el popup con la imagen de la carta
            });
            return card.createCard(); // Devuelve la tarjeta generada
        },
    },
    '#cards',
);

// Muestra las tarjetas
cardManager.renderCards();
