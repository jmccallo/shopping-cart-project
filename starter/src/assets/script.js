/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */
const products = [];
/* Create 3 or more product objects using object literal notation 
   Each product should include five properties
   - name: name of product (string)
   - price: price of product (number)
   - quantity: quantity in cart should start at zero (number)
   - productId: unique id for the product (number)
   - image: picture of product (url string)
*/
 const cherries = {
   name: "Cherries",
   price: 4,
   quantity: 0,
   productId: 1,
   image: "./images/cherry.jpg"
 };

 const strawberries = {
   name: "Strawberries",
   price: 5,
   quantity: 0,
   productId: 2,
   image: "./images/strawberry.jpg"
 };

 const oranges = {
  name: "Oranges",
  price: 10,
  quantity: 0,
  productId: 3,
  image: "./images/orange.jpg"
 };

 products.push(cherries, strawberries, oranges);
/* Images provided in /images folder. All images from Unsplash.com
   - cherry.jpg by Mae Mu
   - orange.jpg by Mae Mu
   - strawberry.jpg by Allec Gomes
*/

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];
/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  products.forEach(product => {
    if (productId === product.productId) {
      product.quantity +=1;
      if (!cart.includes(product)) {
        cart.push(product);
      }
    }
  });
}
/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/
function increaseQuantity(productId) {
  const productToIncrease = cart.find((product) => product.productId === productId);
  if (productToIncrease) {
    productToIncrease.quantity++;
  }
}
/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/
function decreaseQuantity(productId) {
  const productToDecrease = cart.find((product) => product.productId === productId);
  productToDecrease.quantity--;
  if (productToDecrease.quantity === 0) {
    const productIndexToRemove = cart.findIndex((product) => product.productId === productId);
    if (productIndexToRemove !== -1) {
      cart.splice(productIndexToRemove, 1)
    }
  }
}
/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/
function removeProductFromCart(productId) {
  const productToRemove = cart.find((product) => product.productId === productId);
  productToRemove.quantity = 0;
  const productIndexToRemove = cart.findIndex((product) => product.productId === productId);
  if (productIndexToRemove !== -1) {
    cart.splice(productIndexToRemove, 1)
  }
}
/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/
function cartTotal() {
  let total = 0;
  cart.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
}
/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart.length = 0;
}
/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/
function pay (amount) {
  const total = cartTotal();
  const change = amount - total;
  return change;
}
/* Place stand out suggestions here (stand out suggestions can be found at the bottom of the project rubric.)*/
// Defalut currency
let currency = "USD"; 

// Function to get the currency symbol
function getCurrencySymbol(currency) {
  switch(currency) {
    case "EUR":
      return "€";
    case "YEN":
      return "¥";
    default:
      return "$";
  }
}

// Function that formats the currency values
function formatCurrency(value, currency) {
  const currencySymbol = getCurrencySymbol(currency);
  return `${currencySymbol}${value.toFixed(2)}`;
}

// Function to update cash-related elements with the selected currency 
function updateCashElements(currency) {

  // Iterate through product prices and update their formatting
  products.forEach(product => {
    const priceElement = document.getElementById(`price-${product.productId}`);
    priceElement.textContent = formatCurrency(product.price, currency);
  });

  const cashReceivedElement = document.querySelector('.received');
  const cashReturnedElement = document.querySelector('.cash-returned');
  const remainingBalanceElement = document.querySelector('.remaining-balance');

  cashReceivedElement.textContent = `Cash Received: ${formatCurrency(parseFloat(cashReceivedElement.textContent.substring(currency.length + 1)), currency)}`;
  cashReturnedElement.textContent = `Cash Returned: ${formatCurrency(parseFloat(cashReturnedElement.textContent.substring(currency.length + 1)), currency)}`;
  remainingBalanceElement.textContent = `Remaining Balance: ${formatCurrency(parseFloat(remainingBalanceElement.textContent.substring(currency.length + 1)), currency)}`;
}
/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  currency
}
