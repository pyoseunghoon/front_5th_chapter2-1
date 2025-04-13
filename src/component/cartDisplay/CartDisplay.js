let cartDisp;

function createCartDispElement() {
  cartDisp = document.createElement('div');
  cartDisp.id = 'cart-items';
  return cartDisp;
}

function getCartDispElement() {
  return cartDisp;
}

export { createCartDispElement, getCartDispElement };
