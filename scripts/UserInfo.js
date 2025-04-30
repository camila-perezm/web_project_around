class UserInfo {
    constructor({ nameSelector, occupationSelector }) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);
    }

    // Método para obtener los datos del usuario
    getUserInfo() {
        return {
            name: this._name.textContent,
            occupation: this._occupation.textContent,
        };
    }

    // Método para actualizar la información del usuario
    setUserInfo(name, occupation) {
        this._name.textContent = name;
        this._occupation.textContent = occupation;
    }

    // Método para manejar el envío del formulario de perfil
    handleProfileFormSubmit(inputValues) {
        const { name, occupation } = inputValues;
        this.setUserInfo(name, occupation); // Actualiza los datos del perfil
        profilePopup.close(); // Cierra el popup
    }
}

export default UserInfo;
