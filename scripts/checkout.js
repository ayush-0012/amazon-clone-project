import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


let checkoutItems = document.querySelector('.js-checkout-items');
let cartSummaryHtml = '';

cart.forEach((cartItem) => {
   const productId = cartItem.productId;

   let matchingProduct; 
   products.forEach((products) => {
    if(products.id === productId){
      matchingProduct = products;
      
    }
   });

   console.log(matchingProduct);

  cartSummaryHtml += `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label js-quantity-label${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary js-update-items-link"
            data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}"
            data-product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"
            data-product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  `;

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHtml;
  console.log(cartSummaryHtml);


})

// addingToCart();

// checkoutItems.innerHTML = 2


//updating quantity


document.querySelectorAll('.js-update-items-link').forEach((link) => {
  link.addEventListener('click' , () => {
    const productId = link.dataset.productId;
    console.log(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);container.classList.add('is-editing-quantity');

    
      
  });
});


//saving updated quantity
document.querySelectorAll('.js-save-quantity-link').forEach((link) => {
  link.addEventListener('click' , () => {
    
    const productId = link.dataset.productId;
    console.log(productId);

    //getting the value from the user 
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

    let newQuantity = Number(quantityInput.value);

    // if(newQuantity >= 0 && newQuantity <= 1000){
    //   newQuantity 
    // }


    //updating value entered by the user
    if(newQuantity < 0 || newQuantity >= 1000){
      alert('Quantity must be at least 0 and less than 100');
      return;
    }

    updateQuantity(productId , newQuantity);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.classList.remove('is-editing-quantity');

    const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
    quantityLabel.innerHTML = newQuantity;
    updateCartQuantity();
    // quantityLabel.innerHTML = newQuantity;

  });
});

//deleting a product from the cart
document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click' , () => {
    const productId = link.dataset.productId;
    removeFromCart(productId);
    console.log(productId);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    container.remove();
    updateCartQuantity();
  });
});






function updateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

}

const cartQuantity = calculateCartQuantity();
checkoutItems.innerHTML = `${cartQuantity} Items`;