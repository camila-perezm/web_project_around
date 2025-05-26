class UserInfo {
    constructor({ nameSelector, occupationSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._occupation = document.querySelector(occupationSelector);
        this._avatar = document.querySelector(avatarSelector);
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

    setAvatar(avatarUrl) {
        this._avatar.src = avatarUrl;
    }
}

export default UserInfo;
