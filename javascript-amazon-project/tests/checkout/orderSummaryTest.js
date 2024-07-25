import {renderOrderSummary} from "../../scripts/checkout/orderSummary.js";
import {loadFromStorage} from "../../data/cart.js";
import {loadProducts} from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
  it('displays the cart', () => {
    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    beforeAll((done) => {
      loadProducts(() => {
        done();
      });
    });

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: 1
          }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 2,
            deliveryOptionId: 2
          }
        ]
      );
    });
    loadFromStorage();

    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
  });
});