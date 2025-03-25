



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
// Feedback: base de datos de cartas
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

const cards = document.querySelector('#cards');
const cardTemplate = document.querySelector('#card-template');
const inputTitle = document.querySelector('#titulo');
const inputLink = document.querySelector('#link');
const addButton = document.querySelector('.profile__button-add');
const saveButton = document.querySelector('.popup__save-button');

const addCardForm = document.querySelector('#addCardForm');

function handlePopupImgOpen(id) {
    const openPopupImg = document.querySelector('.popup__image');
    const closePopupImg = document.querySelector('.popup__image-close-btn');

    const popupImg = openPopupImg.querySelector('.popup__image-url');
    const popupText = openPopupImg.querySelector('.popup__image-text');

    const selectedCard = storeCards.find((card) => card.id === id);

    popupImg.src = selectedCard.link;
    popupImg.alt = selectedCard.name;
    popupText.textContent = selectedCard.name;

    closePopupImg.addEventListener('click', () => {
        openPopupImg.classList.remove('popup__image-show');
    });

    openPopupImg.classList.add('popup__image-show');
}

/*Crear y eliminar cartas con el template*/

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

/* funcionalidad del boton like, para cambiar el color del boton despues de un click*/
const likeButtons = document.querySelectorAll('.card__text-button-like');


/*Añadir nuevas cartas con el boton "+" */

addCardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = inputTitle.value.trim();
    const link = inputLink.value.trim();

    if (name && link) {
        /*id random para evitar que se repitan los id*/
        const id = 'img-' + Math.random().toString(36).substring(2, 5);
        const newCard = { id, name, link };
        storeCards.unshift(newCard);

        /*el popup se cierra luego de crear la carta*/
        popup2.classList.remove('popup__show');

        inputTitle.value = '';
        inputLink.value = '';
        renderCards();
    } else {
        alert('Por favor, ingrese su nombre y enlace válido.');
    }
});