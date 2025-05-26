import Section from './Section.js';
import Card from './Card.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import UserInfo from './UserInfo.js';
import FormValidator from './FormValidator.js';
import api from './Api.js';
import PopupWithConfirmation from './PopupWithConfirmation.js';

//Elementos del DOM
const openModal = document.querySelector('#popup-open');
const inputName = document.querySelector('#name');
const inputOccupation = document.querySelector('#occupation');
const openModalCard = document.querySelector('#popup-button-add');
const inputTitle = document.querySelector('#title');
const inputLink = document.querySelector('#url');
const cardTemplate = document.querySelector('#card-template');

const avatarForm = document.forms['avatarForm'];
const avatarInput = avatarForm.elements['avatar'];
const avatarImage = document.querySelector('.profile__avatar-img');
const avatarPopup = document.getElementById('popup-edit-avatar');
const editAvatarButton = document.querySelector('.profile__avatar-edit-button');

let userId;
let cardManager;

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
        userId = userData._id;
        userInfo.setUserInfo(userData.name, userData.about);
        userInfo.setAvatar(userData.avatar);

        cardManager = new Section(
            {
                items: [],
                renderer: (cardData) => {
                    const card = new Card(
                        cardData,
                        cardTemplate,
                        (data) => imagePopup.open(data),
                        popupConfirmDelete,
                        userId,
                    );
                    return card.createCard();
                },
            },
            '#cards',
        );

        cards.forEach((cardData) => {
            console.log('Carta recibida:', cardData);

            if (!cardData.link || cardData.link === 'https://imagen.url') {
                api.deleteCard(cardData._id).catch(console.error);
                return;
            }

            const card = new Card(cardData, cardTemplate, (data) => imagePopup.open(data), popupConfirmDelete, userId);
            const cardElement = card.createCard();
            if (cardElement) cardManager.addItem(cardElement);
        });
    })
    .catch((err) => {
        console.error('Error al obtener usuario o tarjetas:', err);
    });

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

//Abrir popup de editar perfil
editAvatarButton.addEventListener('click', () => {
    avatarInput.value = '';
    avatarValidator.resetValidation();
    editAvatarPopup.open();
});

//Crea instancia de UserInfo
const userInfo = new UserInfo({
    nameSelector: '.profile__about-name',
    occupationSelector: '.profile__about-occupation',
    avatarSelector: '.profile__avatar-img',
});

//Función para manejar el envío del formulario de perfil
const handleProfileFormSubmit = (inputValues) => {
    profilePopup.renderLoading(true);
    const { name, occupation } = inputValues;

    api.updateUserInfo({ name, occupation })
        .then((updateUserData) => {
            // Actualiza la interfaz con los datos devueltos por el servidor
            userInfo.setUserInfo(updateUserData.name, updateUserData.about);
            profilePopup.close(); // Cierra el popup
        })
        .catch((err) => {
            console.error('Error al actualizar el perfil', err);
        })
        .finally(() => {
            profilePopup.renderLoading(false); // Asegura que vuelva a "Guardar"
        });
};

// Crea instancia de PopupWithForm para el formulario de perfil
const profilePopup = new PopupWithForm('#popup', handleProfileFormSubmit);
profilePopup.setEventListeners();

//Maejo del formulatio del avatar
const handleAvatarFormSubmit = (inputValues) => {
    editAvatarPopup.renderLoading(true);

    api.updateAvatar({ avatar: inputValues.avatar })
        .then((updatedUser) => {
            userInfo.setAvatar(updatedUser.avatar);
            editAvatarPopup.close();
        })
        .catch((err) => {
            console.error('Error al actualizar el avatar:', err);
        })
        .finally(() => {
            editAvatarPopup.renderLoading(false);
        });
};

const editAvatarPopup = new PopupWithForm('#popup-edit-avatar', handleAvatarFormSubmit);
editAvatarPopup.setEventListeners();

const addCardPopup = new PopupWithForm('#popup-add-card', (inputValues) => {
    addCardPopup.renderLoading(true);

    api.addCard({
        name: inputValues.title,
        link: inputValues.url,
    })
        .then((newCardData) => {
            const card = new Card(
                newCardData,
                cardTemplate,
                (data) => {
                    imagePopup.open(data);
                },
                popupConfirmDelete,
                userId,
            );
            cardManager.addItem(card.createCard());
            addCardPopup.close();
        })
        .catch((err) => {
            console.error('Error al añadir la tarjeta', err);
        })
        .finally(() => {
            addCardPopup.renderLoading(false);
        });
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
const avatarValidator = createValidator('#avatarForm');

const popupConfirmDelete = new PopupWithConfirmation('#popup-confirm-delete');
popupConfirmDelete.setEventListeners();
