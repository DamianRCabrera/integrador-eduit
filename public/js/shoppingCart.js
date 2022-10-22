class ShopCart {
  async ajax(url, method = "get") {
    return await fetch(url, { method: method }).then((res) => res.text());
  }

  
}

// Event Handler for modal of shooping-cart

const modalCheckbox = document.getElementById("main-nav-cart");

document.addEventListener("click", (e) => {
  if (modalCheckbox.checked) {
    if (e.target.className.includes("main-cart-toggle")) {
      return;
    } else if (e.target.className.includes("shopping-cart__close__image")) {
      modalCheckbox.checked = false;
      return;
    } else if (!e.target.className.includes("shopping-cart")) {
      modalCheckbox.checked = false;
      return;
    }
  }
});

document.addEventListener("keyup", (e) => {
  if (modalCheckbox.checked) {
    if (e.key == "Escape") {
      modalCheckbox.checked = false;
      return;
    }
  }
});
