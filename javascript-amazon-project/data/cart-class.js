class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
  
    if(!this.cartItems){
      this.cartItems = [
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: 1
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 2,
          deliveryOptionId: 2
        }
      ];
    }
  };

  updateCartQuantity(){
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    const cartQuantityElement = document.querySelector('.js-cart-quantity');
    cartQuantityElement.innerHTML = cartQuantity;
    return cartQuantity;
  };
  
  saveToLocalStorage(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
    console.log('cart saved to the local storage');
  };

  addToCart(productId){
    let matchingItem;
  
    const quantitySelectorElement = document.querySelector(`.js-quantity-selector-${productId}`);
    let selectedQuantity = Number(quantitySelectorElement.value);
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    if(matchingItem){
      matchingItem.quantity += selectedQuantity;
    } else {
      this.cartItems.push({
        productId: productId,
        quantity: selectedQuantity,
        deliveryOptionId: "1"
      });
    }
  
    this.saveToLocalStorage();
  };

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      }
    });
  
    this.cartItems = newCart;
  
    this.saveToLocalStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
    console.log(matchingItem.deliveryOptionId);
  
    this.saveToLocalStorage();
  };
};

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);