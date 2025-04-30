export function handleAddCardFormSubmit(event, inputTitle, inputLink, storeCards, renderCards, popup) {
    event.preventDefault();

    const name = inputTitle.value.trim();
    const link = inputLink.value.trim();

    if (name && link) {
        // Genera el id aleatorio para evitar duplicados
        const id = 'img-' + Math.random().toString(36).substring(2, 5);
        const newCard = { id, name, link };

        // Agrega la nueva tarjeta al principio del array
        storeCards.unshift(newCard);

        // Cierra el popup después de crear la carta
        popup.classList.remove('popup__show');

        // Limpia los campos de entrada
        inputTitle.value = '';
        inputLink.value = '';

        // Renderiza las cartas
        renderCards();
    } else {
        alert('Por favor, ingrese un nombre y enlace válido.');
    }
}
