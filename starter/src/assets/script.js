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

function getProductByIdFromList(productId, productList) {
  return productList.find((product) => product.productId === productId);
}

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];
/* Create a function named addProductToCart that takes in the product productId as an argument
  - addProductToCart should get the correct product based on the productId
  - addProductToCart should then increase the product's quantity
  - if the product is not already in the cart, add it to the cart
*/
function addProductToCart(productId) {
  let product = getProductByIdFromList(productId, products);

  if(!cart.includes(product)){
    cart.push(product);
  }
  increaseQuantity(productId);
}
/* Create a function named increaseQuantity that takes in the productId as an argument
  - increaseQuantity should get the correct product based on the productId
  - increaseQuantity should then increase the product's quantity
*/

function increaseQuantity(productId) {
  let product = getProductByIdFromList(productId, cart);
  product.quantity += 1;

}

/* Create a function named decreaseQuantity that takes in the productId as an argument
  - decreaseQuantity should get the correct product based on the productId
  - decreaseQuantity should decrease the quantity of the product
  - if the function decreases the quantity to 0, the product is removed from the cart
*/

function decreaseQuantity(productId) {
  let product = getProductByIdFromList(productId, cart);

  product.quantity -= 1;

  if (product.quantity === 0) {
    removeProductFromCart(product.productId);
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument
  - removeProductFromCart should get the correct product based on the productId
  - removeProductFromCart should update the product quantity to 0
  - removeProductFromCart should remove the product from the cart
*/

function removeProductFromCart(productId) {
  let product = getProductByIdFromList(productId, cart);

  product.quantity = 0;

  cart.splice(cart.indexOf(product), 1);
}

/* Create a function named cartTotal that has no parameters
  - cartTotal should iterate through the cart to get the total of all products
  - cartTotal should return the sum of the products in the cart
*/

function cartTotal() {
  let total = 0;
  cart.forEach(product => {
    total += product.price * product.quantity;
  });
  return total;
}

/* Create a function called emptyCart that empties the products from the cart */

function emptyCart() {
  cart.forEach(function (product) {
    removeProductFromCart(product.productId);
  });
}

/* Create a function named pay that takes in an amount as an argument
  - pay will return a negative number if there is a remaining balance
  - pay will return a positive number if money should be returned to customer
*/

// Initialize a variable to keep track of the total amount paid
let totalPaid = 0;

// Define a function name 'pay' that takes an 'amount' as an argument
function pay (amount) {

  // Add the current payment amount to the 'totalPaid' variable
  totalPaid += amount;

  // Calculate the remaining balance by subtracting the cart total from the total paid 
  let remaining = cartTotal() - totalPaid;

  // Check if the remaining amount is greater than or equal to zero
  if (remaining >= 0) {
    // If the payment is sufficient to cover the cart total

    // Reset the 'totalPaid' to zero to prepare it for the next payment
    totalPaid = 0;

    // Empty the cart as the current payment covers the cartTotal
    emptyCart();

    // Return the remaining amount which should be zero or positive
    return remaining;
  }
  else {

    // If the payment is not enough to cover the cart total
    // Return the remaining amount which will be negative
    return remaining;
  }
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

  // Displays cash recieved, cash returned, and remaining balance
  const cashReceivedElement = document.querySelector('.received');
  const cashReturnedElement = document.querySelector('.cash-returned');
  const remainingBalanceElement = document.querySelector('.remaining-balance');

  // Formats the selected currency
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
