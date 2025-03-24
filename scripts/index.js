const openModal = document.querySelector('.profile__about-edit');
const popup = document.querySelector('.popup');
const closeModal = document.querySelector('.popup__close-button');
const formElement = document.querySelector('.popup__form');
const inputName = document.querySelector('#name');
const inputOcupation = document.querySelector('#ocupation');
const profileName = document.querySelector('.profile__about-name');
const profileOcupation = document.querySelector('.profile__about-ocupation');

// Feedback: nombrar mejor las variables.
const popup2 = document.querySelector('.popup2');
const openModal2 = document.querySelector('.profile__button-add');
const closeModal2 = document.querySelector('.popup__close-button2');

/*Abrir y cerar modal de editar perfil*/
if (openModal && popup && closeModal) {
    openModal.addEventListener('click', (event) => {
        event.preventDefault();
        popup.classList.add('popup__show');
    });

    closeModal.addEventListener('click', () => {
        popup.classList.remove('popup__show');
    });
}

/*Abrir y cerar modal de añadir carta*/
if (openModal2 && popup2 && closeModal2) {
    openModal2.addEventListener('click', (event) => {
        event.preventDefault();
        popup2.classList.add('popup__show');
    });

    closeModal2.addEventListener('click', () => {
        popup2.classList.remove('popup__show');
    });
}

/*Editar nombre y ocupacion*/
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

/* Iterar nuevas cartas */
const initialCards = [
    {
        name: 'Valle de Yosemite',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg',
    },
    {
        name: 'Lago Louise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg',
    },
    {
        name: 'Montañas Calvas',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg',
    },
    {
        name: 'Latemar',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg',
    },
    {
        name: 'Parque Nacional de la Vanoise',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg',
    },
    {
        name: 'Lago di Braies',
        link: 'https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg',
    },
];

const cards = document.querySelector('#cards');
const cardTemplate = document.querySelector('#card-template');
const inputTitle = document.querySelector('#titulo');
const inputLink = document.querySelector('#link');
const addButton = document.querySelector('.profile__button-add');
const saveButton = document.querySelector('.popup__save-button');

// Feedback: los forms suelen tener id o una clase unica, justamente para hacer su referencia
const addCardForm = document.querySelector('#addCardForm');

/*Crear y eliminar cartas con el template*/
function createCard(card) {
    const newNode = cardTemplate.content.querySelector('.card').cloneNode(true);
    console.log('new Card', card);
    newNode.querySelector('.card__img-url').src = card.link;

    // Feedback: el alt es importante porque de acá estas populando el popup de la imagen
    newNode.querySelector('.card__img-url').alt = card.name;

    newNode.querySelector('.card__delete-icon').addEventListener('click', function () {
        newNode.querySelector('.card__text').textContent = card.name;
        newNode.remove();
    });
    return newNode;
}

function renderCards() {
    initialCards.forEach(function (card) {
        const newNode = createCard(card);
        cards.append(newNode);
    });
}
renderCards();

/* Crear ventana emergente con la imagen luego de darle click*/

document.addEventListener('DOMContentLoaded', () => {
    const openPopupImg = document.querySelector('.popup__image');
    const closePopupImg = document.querySelector('.popup__image-close-btn');

    if (openPopupImg && closePopupImg) {
        /*Función para manejar y abrir el popup de imagen*/
        function handlePopupImgOpen(name, link) {
            const popupImg = openPopupImg.querySelector('.popup__image-url');
            const popupText = openPopupImg.querySelector('.popup__image-text');

            popupImg.src = link;
            popupImg.alt = name;
            console.log('name image popup', name);
            popupText.textContent = name;

            openPopupImg.classList.add('popup__image-show');
        }

        /*Evento para cerrar el popup*/
        closePopupImg.addEventListener('click', () => {
            openPopupImg.classList.remove('popup__image-show');
        });

        /*Evento para abrir el popup con la imagen de la tarjeta*/
        const cardImages = document.querySelectorAll('.card__img-url');
        cardImages.forEach((img) => {
            img.addEventListener('click', () => {
                const name = img.alt;
                const link = img.src;
                handlePopupImgOpen(name, link);
            });
        });
    } else {
        console.error('No se encontraron los elementos .popup__image o .popup__image-close-btn en el DOM.');
    }
});

/* funcionalidad del boton like, para cambiar el color del boton despues de un click*/
const likeButtons = document.querySelectorAll('.card__text-button-like');

likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('card__text-button-like-active');
    });
});

/*Añadir nuevas cartas con el boton "+" ESTE CODIGO TIENE ERRORES*/

/* Feedback: el evento submit esta asociado al formulario, no al boton */
addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Feedback: inputName no aplica aca, el input es inputTitle
    const name = inputTitle.value.trim();
    const link = inputLink.value.trim();

    console.log('name', name);
    console.log('link', link);

    if (name && link) {
        const newCard = { name, link };

        const newNode = createCard(newCard);
        cards.prepend(newNode);

        // Feedback: el popup se cierra luego de crear la carta
        popup2.classList.remove('popup__show');

        inputTitle.value = '';
        inputLink.value = '';
    } else {
        alert('Por favor, ingrese su nombre y enlace válido.');
    }
});
