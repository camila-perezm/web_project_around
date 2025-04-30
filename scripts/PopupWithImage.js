import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._image = this._popup.querySelector('.popup__image-url'); // Selecciona la imagen
        this._text = this._popup.querySelector('.popup__image-text'); // Selecciona el texto
    }
    // Sobreescribe el método open() para agregar la imagen y el texto
    open({ name, link }) {
        this._image.src = link; // Establece el src de la imagen
        this._image.alt = name; // Establece el alt de la imagen
        this._text.textContent = name; // Establece el texto de la imagen

        super.open();
    }

    // Método para configurar los eventos, incluyendo el botón de cierre
    setEventListeners() {
        super.setEventListeners(); // Llama a setEventListeners del Popup
    }
}
