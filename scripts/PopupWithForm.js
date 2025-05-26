import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector); // Llama al constructor de Popup con el selector
        this._handleFormSubmit = handleFormSubmit; // Almacena el callback de envío del formulario
        this._form = this._popup.querySelector('.popup__form'); // Selecciona el formulario
        this._inputList = this._form.querySelectorAll('.popup__input'); // Selecciona todos los campos de entrada
        this._submitButton = this._form.querySelector('.popup__save-button'); // Botón de enviar
        this._submitButtonOriginalText = this._submitButton.textContent; // Guarda el texto original
    }

    // Método privado para obtener los valores de todos los campos de entrada
    _getInputValues() {
        const inputValues = {};
        this._inputList.forEach((input) => {
            inputValues[input.name] = input.value;
        });
        return inputValues;
    }

    // Modifica setEventListeners() para añadir el submit y el cierre
    setEventListeners() {
        super.setEventListeners(); // Llama al setEventListeners del padre (Popup)

        // Evento para el submit del formulario
        this._form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.renderLoading(true); // Muestra "Guardando..."
            const inputValues = this._getInputValues(); // Obtiene los valores de los inputs
            this._handleFormSubmit(inputValues); // Llama al callback con los valores del formulario
            this.close(); // Cierra el popup después de enviar el formulario
        });
    }

    close() {
        super.close(); // Llama al close() del padre (Popup)
        this._form.reset(); // Reinicia el formulario
        this.renderLoading(false); // Restaura el botón al cerrar
    }
    renderLoading(isLoading) {
        if (isLoading) {
            this._submitButton.textContent = 'Guardando...';
        } else {
            this._submitButton.textContent = this._submitButtonOriginalText;
        }
    }
}
