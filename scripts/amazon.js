import  {cart , saveToStorage, addingToCart} from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { calculateCartQuantity } from '../data/cart.js';
let productsHtml = ''

products.forEach( (products) => {
  productsHtml += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${products.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${products.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${products.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${products.rating.count}
            </div>
          </div>

          <div class="product-price">
           $${formatCurrency(products.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${products.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-display-added-${products.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${products.id}">
            Add to Cart
          </button>
        </div>
  `;
});



document.querySelector('.js-products-grid').innerHTML = productsHtml;

let msgDisappear = null;

let addToCart = document.querySelectorAll('.js-add-to-cart')
.forEach((button) => {
  button.addEventListener('click', () => {
    const productId = button.dataset.productId;

    

//we can create functions for different tasks and call the functions here



    //adding products to our cart
    let matchingItem;
    cart.forEach((cartItem) => {
      if(productId === cartItem.productId) {
        matchingItem = cartItem
      } 
    });

    //displaying added msg when addding a product to cart
    let displayAdded = document.querySelector(`.js-display-added-${productId}`)
    displayAdded.classList.add('display-added-message');

    if (msgDisappear !== null) {
      clearTimeout(msgDisappear);
    }
  //added msg disappearing
     msgDisappear = setTimeout(() => {
      displayAdded.classList.remove('display-added-message')
    }, 2000);


    //selecting the quantity of produtcts
    let quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    let quantity = Number(quantitySelector.value);

    //preventing redundancy from adding same prodcuts differently in the array
    if(matchingItem) {
      matchingItem.quantity += quantity;
    }
    else{
      cart.push({
        productId , 
        quantity
      });
    }
//saving the date in localStorage after adding products to the cart
    saveToStorage();

    //updating the quantity in the cart
    addingToCart();

 
  });
});


addingToCart();