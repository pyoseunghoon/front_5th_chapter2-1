let cartDisp;

function createCartDispElement() {
  cartDisp = document.createElement('div');
  cartDisp.id = 'cart-items';
  return cartDisp;
}

function getCartDispElement() {
  return cartDisp;
}

/**
 * 새로 추가되는 장바구니 목록의 text
 * @param selectedItem
 * @param quantity
 * @returns {HTMLSpanElement}
 */
function createCartItemText(selectedItem, quantity) {
  const span = document.createElement('span');
  span.textContent = `${selectedItem.name} - ${selectedItem.val}원 x ${quantity}`;
  return span;
}

/**
 * 수량  버튼 (- 또는 +)
 * @param id
 * @param change
 * @returns {HTMLButtonElement}
 */
function createQuantityButton(id, change) {
  const btn = document.createElement('button');
  btn.className = 'quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1';
  btn.dataset.productId = id;
  btn.dataset.change = change;
  btn.textContent = change > 0 ? '+' : '-';
  return btn;
}

/**
 * 삭제 버튼
 * @param id
 * @returns {HTMLButtonElement}
 */
function createRemoveButton(id) {
  const btn = document.createElement('button');
  btn.className = 'remove-item bg-red-500 text-white px-2 py-1 rounded';
  btn.dataset.productId = id;
  btn.textContent = '삭제';
  return btn;
}

function createCartItemElement(selectedItem) {
  let newItem = document.createElement('div');
  newItem.id = selectedItem.id;
  newItem.className = 'flex justify-between items-center mb-2';

  const span = createCartItemText(selectedItem, 1);
  const minusBtn = createQuantityButton(selectedItem.id, -1);
  const plusBtn = createQuantityButton(selectedItem.id, 1);
  const removeBtn = createRemoveButton(selectedItem.id);

  newItem.appendChild(span);
  newItem.appendChild(minusBtn);
  newItem.appendChild(plusBtn);
  newItem.appendChild(removeBtn);

  cartDisp.appendChild(newItem);
}

export { createCartDispElement, getCartDispElement, createCartItemElement };
