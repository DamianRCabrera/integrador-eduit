// Initializing variables for inputs on alta.html

const productName = document.getElementById("product-name");
const productBrand = document.getElementById("product-brand");
const productPrice = document.getElementById("product-price");
const productStock = document.getElementById("product-stock");
const productCategory = document.getElementById("product-category");
const productShortDescription = document.getElementById("product-short-description");
const productLongDescription = document.getElementById("product-long-description");
const productAgeFrom = document.getElementById("product-age-from");
const productAgeTo = document.getElementById("product-age-to");
const productFreeShipping = document.getElementById("product-free-shipping");
const productImage = document.getElementById("product-image");

// Initializing variable for form on alta.html

const formAddProduct = document.getElementById("form-add-product");

// RegExp for inputs on alta.html //

const regExpProductName = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{3,60}$/;
const regExpProductBrand = /^[A-Za-z\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,50}$/;
const regExpProductPrice = /^(?![0])\d{1,7}([\.]\d{1,2})?$/;
const regExpProductStock = /^(?![0])\d{1,5}$/;
const regExpProductCategory = /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][\s\.A-ZÁÉÍÓÚÑÜa-záéíóúñü\-\/]{3,25})$/;
const regExpProductShortDescription = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{20,80}$/;
const regExpProductLongDescription = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/;
const regExpProductAgeFrom = /^(?![0])\d{1,2}$/;
const regExpProductAgeTo = /^(?![0])\d{1,2}$/;

// Core Functions //

const validation = (value, regExp) => {
    return regExp.test(value)
}

const clearInput = (e) => {
    if(e.target.value === ''){
        e.target.style.backgroundImage = "none";
        e.target.style.backgroundColor = '#ffffff';
        removeAllPopUps();
        return true
    } return false
}

const createError = (msg, errName = '', popup = '') => {
    let error = new Error(msg);
    error.name = errName;
    error.popup = popup;
    return error;
}

const trimValue = (ev) => {
    ev.target.value = ev.target.value.trim();
}

const displayWarningError = (ev, err) => {
    let divError = document.createElement('div');
    divError.classList.add('error-display__popup');
    divError.innerHTML = err.message;
    ev.target.insertAdjacentElement('afterend', divError);
    return divError
}

const removeAllPopUps = () => {
    let popUps = document.querySelectorAll('.error-display__popup');
    popUps.forEach(popup => popup.remove());
}

const displayCheckOnInput = (ev) => {
    ev.target.style.background='url(./assets/img/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#ffffff';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = 'right 1.5em center';
}

const modifyInputBackgroundOnError = (e) => {
    e.target.style.backgroundColor= '#d63c40';
    e.target.style.backgroundImage = "none";
}


const displayPopUpError = (e, regExp, errMsg) => {
    if(clearInput(e)){return}

    trimValue(e);

    if(validation(e.target.value, regExp) || (e.target.value === '')){
        displayCheckOnInput(e);
        e.target.parentElement.querySelector('.error-display__popup')?.remove();
        return true;
    } else {
        modifyInputBackgroundOnError(e);
        if(e.target.parentElement.querySelector('.error-display__popup') === null){
        let error = createError (errMsg);
        displayWarningError(e, error);
        }
        return false;
    }
}

// Event Handlers for alta.html //

if(formAddProduct){
    formAddProduct.addEventListener('change', (e) => {
        if (e.target.id === 'product-name') {
            displayPopUpError(e, regExpProductName, 'El nombre del producto debe contener entre 2 y 60 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-brand') {
            displayPopUpError(e, regExpProductBrand, 'La marca del producto debe contener entre 3 y 50 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-price') {
            displayPopUpError(e, regExpProductPrice, 'El precio del producto debe contener entre 1 y 7 números, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-stock') {
            displayPopUpError(e, regExpProductStock, 'El stock del producto debe contener entre 1 y 5 números, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-category') {
            displayPopUpError(e, regExpProductCategory, 'La categoría del producto debe contener entre 3 y 25 caracteres, sin números ni caracteres especiales.');
            return;
        } else if (e.target.id === 'product-short-description') {
            displayPopUpError(e, regExpProductShortDescription, 'La descripción corta del producto debe contener entre 20 y 80 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-long-description') {
            displayPopUpError(e, regExpProductLongDescription, 'La descripción larga del producto debe contener entre 30 y 300 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-age-from') {
            displayPopUpError(e, regExpProductAgeFrom, 'La edad mínima del producto debe contener entre 1 y 2 números, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'product-age-to') {
            displayPopUpError(e, regExpProductAgeTo, 'La edad máxima del producto debe contener entre 1 y 2 números, sin caracteres especiales.');
            return;
        } else {
            return;
        }
    });
    
    formAddProduct.addEventListener('submit', (e) => {
        if(validation(productName.value, regExpProductName) &&
        validation(productBrand.value, regExpProductBrand) &&
        validation(productPrice.value, regExpProductPrice) &&
        validation(productStock.value, regExpProductStock) &&
        validation(productCategory.value, regExpProductCategory) &&
        validation(productShortDescription.value, regExpProductShortDescription) &&
        validation(productLongDescription.value, regExpProductLongDescription) &&
        validation(productAgeFrom.value, regExpProductAgeFrom) &&
        validation(productAgeTo.value, regExpProductAgeTo)){
            alert('El producto se ha agregado correctamente.');
            return;
        } else {
            e.preventDefault();
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
    });
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Initializing variables for inputs on contacto.html

const userName = document.getElementById('user-name');
const userLastName = document.getElementById('user-last-name');
const userTelephone = document.getElementById('user-telephone');
const userComment = document.getElementById('user-comment');

// Initializing variable for form on alta.html

const formAddComment = document.getElementById('form-add-comment');

// Regular Expressions for inputs on contacto.html

const regExpUserName = /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][a-záéíóúñü]{2,9})?$/;
const regExpUserLastName = /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19})(\s[a-zA-ZÁÉÍÓÚÑÜáéíóúñü][A-ZÁÉÍÓÚÑÜa-záéíóúñü']{1,19}$)?$/;
const regExpTelephone = /^(\\+54|0)?(9[1-9]|[1-9][1-9]|[1-9][1-9][1-9])([0-9]{4}|[0-9]{3})([0-9]{4})$/;
const regExpUserComment = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{12,300}$/;

// Event Handlers for contacto.html //

if(formAddComment){
    formAddComment.addEventListener('change', (e) => {
        if (e.target.id === 'user-name') {
            displayPopUpError(e, regExpUserName, 'El nombre debe contener entre 3 y 20 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'user-lastname') {
            displayPopUpError(e, regExpUserLastName, 'El apellido debe contener entre 3 y 20 caracteres, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'user-telephone') {
            displayPopUpError(e, regExpTelephone, 'El teléfono debe contener entre 8 y 15 números, sin caracteres especiales.');
            return;
        } else if (e.target.id === 'user-comment') {
            displayPopUpError(e, regExpUserComment, 'El comentario debe contener entre 12 y 300 caracteres, sin caracteres especiales.');
            return;
        } else {
            return;
        }
    });
    
    formAddComment.addEventListener('submit', (e) => {
        if(validation(userName.value, regExpUserName) &&
        validation(userLastName.value, regExpUserLastName) &&
        validation(userTelephone.value, regExpTelephone) &&
        validation(userComment.value, regExpUserComment)){
            alert('El comentario se ha agregado correctamente.');
            return;
        } else {
            e.preventDefault();
            alert('Por favor, complete todos los campos correctamente.');
            return;
        }
    });
}