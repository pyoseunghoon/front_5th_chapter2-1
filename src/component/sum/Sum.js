import { getCartTotal, getTotalDiscountRate } from './Sum.viewmodel.js';

let sum;
function createSumElement() {
  sum = document.createElement('div');
  sum.id = 'cart-total';
  sum.className = 'text-xl font-bold my-4';
  return sum;
}

/**
 * 총 금액(total) 표기
 */
function createSumText() {
  sum.textContent = '총액: ' + Math.round(getCartTotal()) + '원';
}

/**
 * 총 할인율(discountRate) 표기
 */
function createDiscountText() {
  const rate = getTotalDiscountRate();
  if (rate > 0) {
    var span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = '(' + (rate * 100).toFixed(1) + '% 할인 적용)';
    sum.appendChild(span);
  }
}

export { sum, createSumElement, createSumText, createDiscountText };
