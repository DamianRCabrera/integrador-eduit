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

// Initializing variables for buttons on alta.html

const btnAddProduct = document.getElementById("product-add");
const btnResetProduct = document.getElementById("product-reset");

// RegExp for inputs on alta.html

const regExpProductName = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{2,60}$/;
const regExpProductBrand = /^[A-Za-z\dÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇ!ç&\s\.\,\-\(\)\'\"\°\/]{3,50}$/;
const regExpProductPrice = /^(?![0])\d{1,7}([\.]\d{1,2})?$/;
const regExpProductStock = /^(?![0])\d{1,5}$/;
const regExpProductCategory = /^([a-zA-ZÁÉÍÓÚÑÜáéíóúñü][\s\.a-záéíóúñü\-\/]{2,25})$/;
const regExpProductShortDescription = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,80}$/;
const regExpProductLongDescription = /^(?!\s)(?!.\s$)(?=.[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç])[a-zA-Z0-9ÁÉÍÓÚÑÜáéíóúñüÀÂÃÊÓÔÕàâãêôõÇç :°='\.\\¡$#"@¿*&%\/,+\-\(\)~?!]{30,300}$/;
const regExpProductAgeFrom = /^(?![0])\d{1,2}$/;
const regExpProductAgeTo = /^(?![0])\d{1,2}$/;

// Core Functions

function validation(value, regExp) {
    return regExp.test(value)
}

function clearInput(e) {
    if(e.target.value === ''){
        e.target.style.backgroundImage = "none";
        e.target.style.backgroundColor = '#ffffff';
        return true
    } return false
}

function createError (msg, errName = '', popup = '') {
    let error = new Error(msg);
    error.name = errName;
    error.popup = popup;
    return error;
}

function trimValue (ev) {
    ev.target.value = ev.target.value.trim();
}

function displayWarningError (ev, err) {
    let divError = document.createElement('div');
    divError.classList.add('error-display__popup');
    divError.innerHTML = err.message;
    ev.target.insertAdjacentElement('afterend', divError);
    setTimeout(() => divError.remove(), 3000);
    return divError
}

function displayCheckOnInput (ev) {
    ev.target.style.background='url(./assets/img/check.svg) no-repeat right';
    ev.target.style.backgroundColor = '#ffffff';
    ev.target.style.backgroundSize = '1.2em';
    ev.target.style.backgroundPosition = '98% center';
}

function modifyInputBackgroundOnError(e) {
    e.target.style.backgroundColor= '#d63c40';
    e.target.style.backgroundImage = "none";
}


function displayPopUpError(e, regExp, errMsg){
    if(clearInput(e)){return}

    trimValue(e);

    if(validation(e.target.value, regExp) || (e.target.value === '')){
        displayCheckOnInput(e);
    } else {
        modifyInputBackgroundOnError(e);
        let error = createError (errMsg);
        displayWarningError(e, error);
    }
}

/////////////////////////// Events Handling /////////////////////////////////

const formForProducts = document.querySelector('.main-form');

formForProducts.addEventListener('onerror', (e) => {
    if (e.target.id === 'product-name') {
        displayPopUpError(e, regExpProductName, 'El nombre del producto debe contener entre 3 y 10 caracteres, sin números ni caracteres especiales.');
    }}
);