
const openModal = document.querySelector(".profile__about-edit");
const popup = document.querySelector(".popup");
const closeModal = document.querySelector(".popup__close-button")
const formElement = document.querySelector(".popup__form")
const inputName = document.querySelector("#name")
const inputOcupation = document.querySelector("#ocupation")
const profileName = document.querySelector(".profile__about-name")
const profileOcupation = document.querySelector(".profile__about-ocupation")

const popup2 = document.querySelector(".popup2");
const openModal2 = document.querySelector(".profile__button-add")
const closeModal2 = document.querySelector(".popup__close-button2")


if (openModal && popup && closeModal) {
openModal.addEventListener("click", (event) => {
    event.preventDefault();
    popup.classList.add("popup__show")
});

closeModal.addEventListener("click", () => {
    popup.classList.remove("popup__show")
});
}


if (openModal2 && popup2 && closeModal2) {
    openModal2.addEventListener("click", (event) => {
        event.preventDefault();
        popup2.classList.add("popup__show")
    });
    
    closeModal2.addEventListener("click", () => {
        popup2.classList.remove("popup__show")
    });
    }


formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const nameValue = inputName.value.trim();
    const ocupationValue = inputOcupation.value.trim();

if (profileName && profileOcupation) {   
profileName.textContent = nameValue;
profileOcupation.textContent = ocupationValue;
}

popup.classList.remove("popup__show");

inputName.value = '';
inputOcupation.value = '';

});

const initialCards = [
    {
      name: "Valle de Yosemite",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/yosemite.jpg"
    },
    {
      name: "Lago Louise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lake-louise.jpg"
    },
    {
      name: "Montañas Calvas",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/bald-mountains.jpg"
    },
    {
      name: "Latemar",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/latemar.jpg"
    },
    {
      name: "Parque Nacional de la Vanoise",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/vanoise.jpg"
    },
    {
      name: "Lago di Braies",
      link: "https://practicum-content.s3.us-west-1.amazonaws.com/new-markets/WEB_sprint_5/ES/lago.jpg"
    }
  ];


const cards = document.querySelector("#cards");
const cardTemplate = document.querySelector("#card-template");
const inputTitle = document.querySelector("#titulo");
const inputLink = document.querySelector("#link");
const addButton = document.querySelector(".profile__button-add");

function createCard (card) {
const newNode = cardTemplate.content.querySelector(".card").cloneNode(true);
newNode.querySelector(".card__img-container").src=card.link
newNode.querySelector(".card__text").textContent=card.name
newNode.querySelector(".card__delete-icon").addEventListener("click", function(){
    newNode.remove();
})

return newNode;
}

function renderCards() {
    initialCards.forEach(function(card){
const newNode = createCard(card);
cards.append(newNode);
    });
}
renderCards();

addButton.addEventListener("click", function(){
    const name = inputName.value.trim();
    const link = inputLink.value.trim();

if (name && link) {
    const newCard = {name, link};
    initialCards.push(newCard);
    const newNode = createCard(name, link);
    cardTemplate.append(newNode);

    inputName.value = "";
    inputLink.value = "";
} else {
    alert("Por favor, ingrese su nombre y enlace válido.");
}
});

  