const items = [
  {
    id: 10,
    code: 2030,
    name: "Fork",
    value: 2,
    image:
      "https://fastly.picsum.photos/id/23/3887/4899.jpg?hmac=2fo1Y0AgEkeL2juaEBqKPbnEKm_5Mp0M2nuaVERE6eE",
  },
  {
    id: 20,
    code: 1345,
    name: "Mug",
    value: 10,
    image:
      "https://fastly.picsum.photos/id/30/1280/901.jpg?hmac=A_hpFyEavMBB7Dsmmp53kPXKmatwM05MUDatlWSgATE",
  },
  {
    id: 30,
    code: 1070,
    name: "Controller",
    value: 100,
    image:
      "https://fastly.picsum.photos/id/96/4752/3168.jpg?hmac=KNXudB1q84CHl2opIFEY4ph12da5JD5GzKzH5SeuRVM",
  },
  {
    id: 40,
    code: 9820,
    name: "Boat",
    value: 1200,
    image:
      "https://fastly.picsum.photos/id/124/3504/2336.jpg?hmac=B1Avp6or9Df8vpnN4kQsGNfD66j8hH3gLtootCoTw4M",
  },
  {
    id: 50,
    code: 5465,
    name: "Bicycle",
    value: 280,
    image:
      "https://fastly.picsum.photos/id/146/5000/3333.jpg?hmac=xdlFnzoavokA3U-bzo35Vk4jTBKx8C9fqH5IuCPXj2U",
  },
  {
    id: 60,
    code: 7515,
    name: "Guitar",
    value: 80,
    image:
      "https://fastly.picsum.photos/id/145/4288/2848.jpg?hmac=UkhcwQUE-vRBFXzDN1trCwWigpm7MXG5Bl5Ji103QG4",
  },
  {
    id: 70,
    code: 2226,
    name: "Phone",
    value: 990,
    image:
      "https://fastly.picsum.photos/id/160/3200/2119.jpg?hmac=cz68HnnDt3XttIwIFu5ymcvkCp-YbkEBAM-Zgq-4DHE",
  },
  {
    id: 80,
    code: 1364,
    name: "Tea",
    value: 45,
    image:
      "https://fastly.picsum.photos/id/225/1500/979.jpg?hmac=jvGoek9ng_Y0GaBbzxN0KJhHaiPtk1VfRcukK8R8FxQ",
  },
  {
    id: 90,
    code: 6974,
    name: "Camera",
    value: 210,
    image:
      "https://fastly.picsum.photos/id/250/4928/3264.jpg?hmac=4oIwzXlpK4KU3wySTnATICCa4H6xwbSGifrxv7GafWU",
  },
];

//main layer

const createItem = (item) => {
  const itemContainer = document.createElement("div");
  itemContainer.id = item.id; //id do item
  itemContainer.classList.add("product");

  const itemName = document.createElement("h2");
  itemName.innerHTML = item.name;
  itemName.classList.add("product__name");

  const itemPrice = document.createElement("p");
  itemPrice.innerHTML = `$ ${item.value}.00`;
  itemPrice.classList.add("product__price");

  const buyButton = document.createElement("button");
  buyButton.innerHTML = "Buy here";
  buyButton.id = item.id; //id do botao
  buyButton.classList.add("product__buy__btn");

  buyButton.addEventListener("click", () => addItemInShoppingCart(item));

  const itemImage = document.createElement("img");
  itemImage.src = item.image;
  itemImage.classList.add("product__img");

  itemContainer.appendChild(itemName);
  itemContainer.appendChild(itemPrice);
  itemContainer.appendChild(itemImage);
  itemContainer.appendChild(buyButton);

  productsDiv.appendChild(itemContainer);
};

const changeDisplay = () => {
  if (productsDiv.classList.contains("products--list-view")) {
    productsDiv.classList.remove("products--list-view");
    organizeButton.classList.remove("organize-page__options__btn--list-view");
  } else {
    productsDiv.classList.add("products--list-view");
    organizeButton.classList.add("organize-page__options__btn--list-view");
  }
};

const orderListLowToHigh = () => {
  items.sort((a, b) => {
    return a.value - b.value;
  });
};

const orderListHighToLow = () => {
  items.sort((a, b) => {
    return -(a.value - b.value);
  });
};

const orderListAToZOrder = () => {
  items.sort((a, b) => new Intl.Collator("en").compare(a.name, b.name));
};

const orderListZToAOrder = () => {
  items
    .sort((a, b) => new Intl.Collator("en").compare(a.name, b.name))
    .reverse();
};

const sortItems = (option) => {
  const currentOption = option.target.value;
  productsDiv.innerHTML = "";

  if (currentOption === "Price: Low to High") {
    orderListLowToHigh();
  }

  if (currentOption === "Price: High to Low") {
    orderListHighToLow();
  }

  if (currentOption === "A to Z") {
    orderListAToZOrder();
  }

  if (currentOption === "Z to A") {
    orderListZToAOrder();
  }

  items.forEach((item) => {
    createItem(item);
  });
};

const filterItems = (e) => {
  const currentValue = e.target.value;
  productsDiv.innerHTML = "";

  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(currentValue.toLowerCase());
  });

  filteredItems.forEach((item) => {
    createItem(item);
  });
};

const productsDiv = document.getElementById("products");

const organizeButton = document.getElementById("organize-page__options__btn");
organizeButton.addEventListener("click", changeDisplay);

const selectOrder = document.getElementById("organize-page__items-order");
selectOrder.addEventListener("change", sortItems);

const inputSearch = document.getElementById("search");
inputSearch.addEventListener("input", filterItems);

items.forEach((item) => {
  createItem(item);
});

//shopping cart layer

const shoppingCartList = document.querySelector(".shopping-cart__list");
const shoppingCart = JSON.parse(localStorage.getItem("itensInShoppingCart")) || [];;

const showShoppingCart = () => {
  shoppingCartLayer.classList.add("layer__shopping-cart--active");
  shoppingCartLayer.classList.remove("layer__shopping-cart");
};

const closeShoppingCart = () => {
  shoppingCartLayer.classList.add("layer__shopping-cart");
  shoppingCartLayer.classList.remove("layer__shopping-cart--active");
};

const shoppingCartBtn = document.getElementById("shopping-cart__button");

const shoppingCartLayer = document.getElementById("layer__shopping-cart");
shoppingCartBtn.addEventListener("click", showShoppingCart);

const closeShoppingCartBtn = document.getElementById(
  "shopping-cart__button__close-tab"
);
closeShoppingCartBtn.addEventListener("click", closeShoppingCart);

const createShoppingCartItem = (item) => {
  const itemShoppingCart = document.createElement("li");
  itemShoppingCart.classList.add("shopping-cart__list__item");

  const imgItemShoppingCart = document.createElement("img");
  imgItemShoppingCart.src = item.image;
  imgItemShoppingCart.classList.add("shopping-cart__list__item__img");

  const itemShoppingCartName = document.createElement("h2");
  itemShoppingCartName.innerHTML = item.name;
  itemShoppingCartName.classList.add("shopping-cart__list__item__name");

  const itemShoppingCartPrice = document.createElement("p");
  itemShoppingCartPrice.innerHTML = `$ ${item.value}.00`;
  itemShoppingCartPrice.classList.add("shopping-cart__list__item__price");

  const itemShoppingCartTotalPrice = document.createElement("p");
  itemShoppingCartTotalPrice.innerHTML = `$ ${item.value * item.quantity},00`;
  itemShoppingCartTotalPrice.classList.add(
    "shopping-cart__list__item__total__price"
  );

  const itemShoppingCartQuantity = document.createElement("input");
  itemShoppingCartQuantity.type = "number";
  itemShoppingCartQuantity.min = "1";
  itemShoppingCartQuantity.max = "20";
  itemShoppingCartQuantity.value = item.quantity;
  itemShoppingCartQuantity.dataset.id = item.id;
  itemShoppingCartQuantity.classList.add("shopping-cart__list__item__quantity");
  itemShoppingCartQuantity.addEventListener("input", (e) =>
    changeItemQuantity(item, e)
  );

  const removeProduct = document.createElement("button");
  removeProduct.classList.add("shopping-cart__button__remove-item");
  removeProduct.addEventListener("click", () =>
    removeProductFromShoppingCart(item)
  );

  itemShoppingCart.appendChild(itemShoppingCartTotalPrice);
  itemShoppingCart.appendChild(itemShoppingCartQuantity);
  itemShoppingCart.appendChild(itemShoppingCartPrice);
  itemShoppingCart.appendChild(itemShoppingCartName);
  itemShoppingCart.appendChild(imgItemShoppingCart);
  itemShoppingCart.appendChild(removeProduct);

  shoppingCartList.appendChild(itemShoppingCart);
};

const addItemInShoppingCart = (item) => {
  const shoppingCartItem = shoppingCart.find(
    (cartItem) => cartItem.id === item.id
  );

  if (shoppingCartItem) {
    return;
  } else {
    const newItem = { ...item, quantity: 1 };
    shoppingCart.push(newItem);
  }

  shoppingCartList.innerHTML = "";
  shoppingCart.forEach((item) => {
    createShoppingCartItem(item);
  });

  purchaseTotalPrice();
  cartItemsCounter();

  localStorage.setItem("itensInShoppingCart", JSON.stringify(shoppingCart));
};

const removeProductFromShoppingCart = (item) => {
  const shoppingCartItemIndex = shoppingCart.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  shoppingCart.splice(shoppingCartItemIndex, 1);

  shoppingCartList.innerHTML = "";
  shoppingCart.forEach((item) => {
    createShoppingCartItem(item);
  });

  purchaseTotalPrice();
  cartItemsCounter();

  localStorage.setItem("itensInShoppingCart", JSON.stringify(shoppingCart));
};

const changeItemQuantity = (item, e) => {
  const shoppingCartItem = shoppingCart.find(
    (cartItem) => cartItem.id === item.id
  );

  shoppingCartItem.quantity = e.target.value;

  shoppingCartList.innerHTML = "";
  shoppingCart.forEach((item) => {
    createShoppingCartItem(item);
  });

  purchaseTotalPrice();
  cartItemsCounter();

  localStorage.setItem("itensInShoppingCart", JSON.stringify(shoppingCart));
};

const purchaseTotalPrice = () => {
  const inicialValue = 0;
  const totalPrice = shoppingCart.reduce(
    (acc, currentValue) => acc + currentValue.value * currentValue.quantity,
    inicialValue
  );

  const totalPriceContainer = document.querySelector(
    ".shopping-cart__total-price"
  );
  totalPriceContainer.innerHTML = `$ ${totalPrice},00`;
};

const cartItemsCounter = () => {
  const inicialValue = 0;
  const numberOfItems = shoppingCart.reduce(
    (acc, currentValue) => acc + parseInt(currentValue.quantity),
    inicialValue
  );

  const cartItemsCounterContainer = document.querySelector(
    ".shopping-cart__button__counter"
  );
  cartItemsCounterContainer.innerHTML = numberOfItems;
};

// manteins shopping cart data after reloading page
shoppingCart.forEach((item) => {
  createShoppingCartItem(item);
})

purchaseTotalPrice();
cartItemsCounter();
