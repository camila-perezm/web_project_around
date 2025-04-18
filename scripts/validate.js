
//funcion para mostrar errores
const showError = (input, requirements) => {
    const errorMessage = input.validationMessage;
   const errorElement = document.querySelector(`#${input.id}-error`) ; 
   input.classList.add(requirements.inputErrorClass); // Agrega clase de error
    errorElement.textContent = errorMessage;
    errorElement.classList.add(requirements.errorClass); // Agrega clase de mensaje de error
}
//funcion para esconder errores
const hideError = (input, requirements) => {
    const errorElement = document.querySelector(`#${input.id}-error`);
   input.classList.remove(requirements.inputErrorClass);
    errorElement.classList.remove(requirements.errorClass);
    errorElement.textContent = '';
}
//funcion para validar los inputs
const checkInputValidity = (input, requirements) => {
    if (input.validity.valid) {
    hideError(input, requirements);
    input.classList.remove('touched')

 } else {
    showError(input, requirements);
    input.classList.add('touched');
 }}

 //función para activar/desactivar el botón según la validez de los inputs
const toggleButtonstate = (form, button, requirements) => {
    const inputs = Array.from(form.querySelectorAll(requirements.inputSelector));
    const isValid = inputs.every((input) => input.validity.valid)

    if (isValid) {
        button.disabled = false;
        button.classList.remove('popup__button_disabled');
        button.classList.add('popup__save-button');
 } else {
       button.disabled = true;
       button.classList.remove('popup__save-button');
        button.classList.add('popup__button_disabled');
    }
}

// Event listeners que mapean cada uno de los inputs 
const setEventListener = (formElement, requirements) => {
    const inputs = formElement.querySelectorAll(requirements.inputSelector)
    const button = formElement.querySelector(requirements.submitButtonSelector)
    
    //Activa y desactiva el boton
    toggleButtonstate(formElement, button, requirements);


    inputs.forEach((input) => {
        input.addEventListener("focus", () => {
            // Cuando el campo reciba el foco, añadimos la clase 'touched' 
            input.classList.add('touched');
        });

        input.addEventListener("input" , () => {
            checkInputValidity(input, requirements)
            toggleButtonstate(formElement, button, requirements);
        });
        
    });
    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    })}

 //Llama a todos los formularions, habilita la validacion 
export const enableValidation = (requirements) => {
    const forms = document.querySelectorAll(requirements.formSelector)
 forms.forEach((formElement) => {
        setEventListener(formElement, requirements)
    })   
}


