export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items; // array de datos
        this._renderer = renderer; // función que crea el elemento DOM
        this._container = document.querySelector(containerSelector); // contenedor donde agrego los datos
    }

    //Metodo para renderizar todos los elementos
    renderCards() {
        // Limpia el contenedor antes de renderizar las nuevas cartas
        this._container.innerHTML = '';

        this._items.forEach((item) => {
            const element = this._renderer(item);
            this.addItem(element);
        });
    }
    // Método para agregar un nuevo item al contenedor
    addItem(element) {
        this._container.prepend(element); // Añade el nuevo elemento al principio
    }
}
