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

setupPopup(openModal, popup, closeModal);
handleProfileFormSubmit(formElement, inputName, inputOcupation, profileName, profileOcupation, popup);

addCardForm.addEventListener('submit', function (event) {
    handleAddCardFormSubmit(event, inputTitle, inputLink, storeCards, () => cardManager.renderCards(), popup);
});

setupPopup(openModalCard, popupAddCard, closeModalCard);
//handleProfileFormSubmit(formElement, inputTitle, inputLink, popupAddCard, popup);

/* voy a copiar desde aqui a utils.js

//Abrir y cerar modal de editar perfil
if (openModal && popup && closeModal) {
    openModal.addEventListener('click', (event) => {
        event.preventDefault();
        popup.classList.add('popup__show');
    });

    closeModal.addEventListener('click', () => {
        popup.classList.remove('popup__show');
    });

 // Agrega un evento para cerrar el popup al hacer clic fuera de la ventana emergente
 popup.addEventListener('click', (event) => {
    // Verifica si el clic fue fuera del contenido del popup (y no sobre el contenido)
    if (event.target === popup) {
        popup.classList.remove('popup__show'); // Cerrar el popup si el clic fue fuera del contenido
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {  // Comprueba si la tecla presionada es "Esc"
        popup.classList.remove('popup__show'); // Cerrar el popup
    }
});

}

//Abrir y cerar modal de añadir carta
if (openModal2 && popup2 && closeModal2) {
    openModal2.addEventListener('click', (event) => {
        event.preventDefault();
        popup2.classList.add('popup__show');
    });

    closeModal2.addEventListener('click', () => {
        popup2.classList.remove('popup__show');
    });
    
 // Agregar un evento para cerrar el popup al hacer clic fuera de la ventana emergente
 popup2.addEventListener('click', (event) => {
    
    if (event.target === popup2) {
        popup2.classList.remove('popup__show'); 
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {  
        popup2.classList.remove('popup__show'); 
    }
});

}

//Editar nombre y ocupacion
formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameValue = inputName.value.trim();
    const ocupationValue = inputOcupation.value.trim();

    if (profileName && profileOcupation) {
        profileName.textContent = nameValue;
        profileOcupation.textContent = ocupationValue;
    }

    popup.classList.remove('popup__show');

    inputName.value = '';
    inputOcupation.value = '';
});

*/

/*
function handlePopupImgOpen(id) {
    const openPopupImg = document.querySelector('.popup__image');
    const closePopupImg = document.querySelector('.popup__image-close-btn');

    const popupImg = openPopupImg.querySelector('.popup__image-url');
    const popupText = openPopupImg.querySelector('.popup__image-text');

    const selectedCard = storeCards.find((card) => card.id === id);
// Asignar los valores del popup
    popupImg.src = selectedCard.link;
    popupImg.alt = selectedCard.name;
    popupText.textContent = selectedCard.name;

    // Función para cerrar el popup
    const closePopup = () => {
        openPopupImg.classList.remove('popup__image-show'); // Esto cierra la ventana emergente al eliminar la clase
    };

    // Cerrar ventana al hacer clic en el botón de cerrar
    closePopupImg.addEventListener('click', closePopup);

    //Cerrar ventana al hacer clic fuera de la imagen (fuera de los bordes del popup)
    openPopupImg.addEventListener('click', (event) => {
        // Verifica si el clic ocurrió fuera de la imagen (fuera de la ventana emergente)
        if (!event.target.closest('.popup__image-container')) {
            closePopup();  // Cerrar popup si el clic fue fuera de la imagen
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {  
            openPopupImg.classList.remove('popup__image-show'); 
        }
    });

    // Mostrar la ventana emergente
    openPopupImg.classList.add('popup__image-show');
}

 AQUI TERMINA A COPIA A UTILS.JS */

/*

//Crear y eliminar cartas con el template

function deleteCard(cardId) {
    storeCards = storeCards.filter((card) => card.id !== cardId);
    renderCards();
}

function toggleLike(cardId) {
    const card = storeCards.find((card) => card.id === cardId);
    card.liked = !card.liked;
    renderCards();
}

function createCard(card) {
    const newNode = cardTemplate.content.querySelector('.card').cloneNode(true);
    

    newNode.querySelector('.card__img-url').src = card.link;

    newNode.id = card.id;

   
    newNode.querySelector('.card__img-url').alt = card.name;

   
    newNode.querySelector('.card__text').textContent = card.name;

    newNode.querySelector('.card__delete-icon').addEventListener('click', function () {
        deleteCard(card.id);
    });

    newNode.querySelector('.card__text-button-like').addEventListener('click', function () {
        toggleLike(card.id);
    });

    newNode.querySelector('.card__img-url').addEventListener('click', () => {
        handlePopupImgOpen(card.id);
    });

    return newNode;
}

function renderCards() {
    const cards = document.querySelector('#cards');
    cards.innerHTML = '';

    storeCards.forEach(function (card) {
        const newNode = createCard(card);
        if (card.liked) {
            newNode.querySelector('.card__text-button-like').classList.add('card__text-button-like-active');
        }
        cards.append(newNode);
    });
}

renderCards();

*/

// funcionalidad del boton like, para cambiar el color del boton despues de un click

/*
Añadir nuevas cartas con el boton "+" 

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = inputTitle.value.trim();
    const link = inputLink.value.trim();

    if (name && link) {
        //id random para evitar que se repitan los id
        const id = 'img-' + Math.random().toString(36).substring(2, 5);
        const newCard = { id, name, link };
        storeCards.unshift(newCard);

        //el popup se cierra luego de crear la carta
        popup.classList.remove('popup__show'); //aqui estuvo popup2

        inputTitle.value = '';
        inputLink.value = '';
        renderCards();
    } else {
        alert('Por favor, ingrese su nombre y enlace válido.');
    }
}); */
