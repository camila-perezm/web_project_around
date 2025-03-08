
const openModal = document.querySelector(".profile__about_edit");
const popup = document.querySelector(".popup");
const closeModal = document.querySelector(".popup__close_button")
const formElement = document.querySelector(".popup__form")
const inputName = document.querySelector("#name")
const inputOcupation = document.querySelector("#ocupation")
const profileName = document.querySelector(".profile__about_name")
const profileOcupation = document.querySelector(".profile__about_ocupation")



if (openModal && popup && closeModal) {
openModal.addEventListener("click", (event) => {
    event.preventDefault();
    popup.classList.add("popup__show")
});

closeModal.addEventListener("click", () => {
    popup.classList.remove("popup__show")
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
