export default class FormValidator {
    constructor(requirements) {
        this._requirements = requirements;
        this._formElement = document.querySelector(requirements.formSelector);
    }
    //metodo para mostrar errores
    _showError(input) {
        const errorMessage = input.validationMessage;
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.add(this._requirements.inputErrorClass); // Agrega clase de error
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._requirements.errorClass); // Agrega clase de mensaje de error
    }
    // metodo para esconder errores
    _hideError(input) {
        const errorElement = this._formElement.querySelector(`#${input.id}-error`);
        input.classList.remove(this._requirements.inputErrorClass);
        errorElement.classList.remove(this._requirements.errorClass);
        errorElement.textContent = '';
    }
    // metodo para validar los inputs
    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideError(input);
            input.classList.remove('touched');
        } else {
            this._showError(input);
            input.classList.add('touched');
        }
    }
    // metodo para activar/desactivar el botón según la validez de los inputs
    _toggleButtonState() {
        const button = this._formElement.querySelector(this._requirements.submitButtonSelector);
        const inputs = Array.from(this._formElement.querySelectorAll(this._requirements.inputSelector));
        const isValid = inputs.every((input) => input.validity.valid);

        if (isValid) {
            button.disabled = false;
            button.classList.remove('popup__button_disabled');
            button.classList.add('popup__save-button');
        } else {
            button.disabled = true;
            button.classList.add('popup__button_disabled');
        }
    }

    // Agregar eventos a inputs
    _setEventListener() {
        const inputs = this._formElement.querySelectorAll(this._requirements.inputSelector);

        inputs.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            });
            input.addEventListener('focus', () => {
                input.classList.add('touched');
            });
        });

        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
    }
    //Llama a todos los formularions, habilita la validacion
    enableValidation() {
        const forms = document.querySelectorAll(this._requirements.formSelector);
        forms.forEach((form) => {
            this._setEventListener();
            this._toggleButtonState();
        });
    }
}
