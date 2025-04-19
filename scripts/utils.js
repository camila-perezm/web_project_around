export function setupPopup(openModal, popup, closeModal) {
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
            if (event.key === 'Escape') {
                // Comprueba si la tecla presionada es "Esc"
                popup.classList.remove('popup__show'); // Cerrar el popup
            }
        });
    }
}

// Función: submit de formulario de perfil DEBERIA SER PARTE DEL FORMVALIDATOR
export function handleProfileFormSubmit(formElement, inputName, inputOcupation, profileName, profileOcupation, popup) {
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
}

// Función: mostrar imagen en popup
export function handlePopupImgOpen(id, storeCards) {
    const selectedCard = storeCards.find((card) => card.id === id);
    if (!selectedCard) return;

    const openPopupImg = document.querySelector('.popup__image');
    const closePopupImg = document.querySelector('.popup__image-close-btn');

    const popupImg = openPopupImg.querySelector('.popup__image-url');
    const popupText = openPopupImg.querySelector('.popup__image-text');

    popupImg.src = selectedCard.link;
    popupImg.alt = selectedCard.name;
    popupText.textContent = selectedCard.name;

    const closePopup = () => {
        openPopupImg.classList.remove('popup__image-show');
    };

    closePopupImg.addEventListener('click', closePopup);

    openPopupImg.addEventListener('click', (event) => {
        if (!event.target.closest('.popup__image-container')) {
            closePopup();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closePopup();
        }
    });

    openPopupImg.classList.add('popup__image-show');
}

export function handleAddCardFormSubmit(event, inputTitle, inputLink, storeCards, renderCards, popup) {
    event.preventDefault();

    const name = inputTitle.value.trim();
    const link = inputLink.value.trim();

    if (name && link) {
        // Generar id aleatorio para evitar duplicados
        const id = 'img-' + Math.random().toString(36).substring(2, 5);
        const newCard = { id, name, link };

        // Agregar la nueva tarjeta al principio del array
        storeCards.unshift(newCard);

        // Cerrar el popup después de crear la carta
        popup.classList.remove('popup__show');

        // Limpiar los campos de entrada
        inputTitle.value = '';
        inputLink.value = '';

        // Renderizar las cartas
        renderCards();
    } else {
        alert('Por favor, ingrese un nombre y enlace válido.');
    }
}
