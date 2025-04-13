import cartDisp from '../cartDisplay/CartDisplay.js';
import prodList from '../sel/Sel.Model.js';

// 할인이 적용된 총액
let total = 0;
// 할인이 적용되지 않은 총액
let originTotal = 0;
// 총 구매한 상품의 개수
let itemCnt = 0;
// 최종 할인율
let discountRate = 0;
/**
 *
 * @param prodList  판매 상품 목록
 * @param cartItems 사용자가 담은 상품 정보들
 * @returns {{originTotal: number, total: number, itemCnt: number}}  {기본금액, 할인된금액, 구매한 상품 개수}
 */
export function getTotalSum(prodList, cartItems) {
  total = 0;
  itemCnt = 0;
  originTotal = 0;

  for (let i = 0; i < cartItems.length; i++) {
    (function () {
      let curItem = findItem(prodList, cartItems[i].id);
      let curItemCount = findItemCount(cartItems[i]);
      let curItemTotal = curItem.val * curItemCount;

      itemCnt += curItemCount;
      originTotal += curItemTotal;

      let discountRate = getDiscountRate(curItemCount, curItem);

      total += curItemTotal * (1 - discountRate);
    })();
  }
}

/**
 *
 * @param prodList 판매 상품 목록
 * @param cartItemId 사용자가 담은 상품 번호
 * @returns {*}  사용자가 담은 상품
 */
function findItem(prodList, cartItemId) {
  let item;
  for (let i = 0; i < prodList.length; i++) {
    if (prodList[i].id === cartItemId) {
      item = prodList[i];
      break;
    }
  }
  return item;
}

/**
 *
 * @param cartItem 사용자가 담은 상품 정보
 * @returns {number} 상품의 구매 개수
 */
function findItemCount(cartItem) {
  return parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
}

/**
 *
 * @param curItemCount  사용자가 담은 상품 개수
 * @param curItem 사용자가 담은 상품
 * @returns {number} 구매상품에 대한 할인율
 */
function getDiscountRate(curItemCount, curItem) {
  let discountRate = 0;
  if (curItemCount < 10) return discountRate;

  if (curItem.id === 'p1') discountRate = 0.1;
  else if (curItem.id === 'p2') discountRate = 0.15;
  else if (curItem.id === 'p3') discountRate = 0.2;
  else if (curItem.id === 'p4') discountRate = 0.05;
  else if (curItem.id === 'p5') discountRate = 0.25;

  return discountRate;
}

/**
 * 사용자의 장바구니 목록의 상태 정보 갱신
 * @returns {{originTotal: number, total: number, itemCnt: number}} {기본금액, 할인된금액, 구매한 상품 개수}
 */
export function updateCartStatus() {
  // 사용자가 담은 items
  let cartItems = cartDisp.children;
  if (cartItems.length === 0) {
    total = 0;
    itemCnt = 0;
    originTotal = 0;
  } else {
    getTotalSum(prodList, cartItems);
  }
}

/**
 * 적용된 할인율 개산
 * @param total 할인된금액
 * @param originTotal 기본금액
 * @param itemCnt 구매한 상품 개수
 * @returns {number} 적용된 할인율 (%)
 */
export function updateTotalDiscountRate() {
  if (itemCnt >= 30) {
    let bulkDisc = total * 0.25; // 추가 할인시 가격
    let itemDisc = originTotal - total; // 기존 할인 가격
    // 추가 할인 가격이 클 경우에만 0.25 할인율 적용
    if (bulkDisc > itemDisc) {
      total = originTotal * (1 - 0.25);
      discountRate = 0.25;
    } else {
      discountRate = (originTotal - total) / originTotal;
    }
  } else {
    discountRate = (originTotal - total) / originTotal;
  }

  // 요일 할인 적용
  if (new Date().getDay() === 2) {
    total *= 1 - 0.1;
    discountRate = Math.max(discountRate, 0.1);
  }
}

export function getCartTotal() {
  return total;
}
export function getCartOriginTotal() {
  return originTotal;
}
export function getCartItemCount() {
  return itemCnt;
}
export function getTotalDiscountRate() {
  return discountRate;
}
