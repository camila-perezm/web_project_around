export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    // Abre el popup
    open() {
        this._popup.classList.add('popup__show');
        document.addEventListener('keydown', this._handleEscClose); // Esc para cerrar
    }

    // Cierra el popup
    close() {
        this._popup.classList.remove('popup__show');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    // Cierra el popup si presiono "Esc"
    _handleEscClose(event) {
        if (event.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        // Agrega eventos de clic para cerrar el popup (clic fuera del popup)
        this._popup.addEventListener('click', (event) => {
            if (event.target === this._popup) {
                this.close();
            }
        });
        // Cierra haciendo clic en el botón de cerrar
        if (this._closeButton) {
            this._closeButton.addEventListener('click', () => {
                this.close();
            });
        }
    }
}
