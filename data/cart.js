export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart = [{
    productId : 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity : 2,
  }, {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
  }];
}

 

export function saveToStorage(){
  localStorage.setItem('cart' , JSON.stringify(cart))
}

export function removeFromCart (productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
//saving the data when removing products from our carts
  saveToStorage();
}

export function addingToCart(){
    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

    
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem) => {

      if(cartItem.quantity >= 0 && cartItem.quantity <= 1000){
        cartQuantity += cartItem.quantity;
      }
      
    });
    
    return cartQuantity;
}

export function updateQuantity(productId , newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;

  saveToStorage();
  
}

