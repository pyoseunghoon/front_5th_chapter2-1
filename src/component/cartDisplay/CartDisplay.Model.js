import ProductModel from '../sel/Sel.Model.js';
import { createCartItemElement } from './CartDisplay.js';
import { calcCart } from './CartDisplay.viewmodel.js';

const TEXT_CART_ITEM = (name, price, count) => `${name} - ${price}원 x ${count}`;
const MESSAGE_OUT_OF_STOCK = '재고가 부족합니다.';

/**
 * 사용자가 선택한 상품을 장바구니에 담는 기능
 * @param productId 판매 상품 Id
 * @param selectedItem 판매 상품 정보
 */
export function addItem(productId, selectedItem) {
  // 선택한 item의 재고 존재시
  if (selectedItem && selectedItem.quantity > 0) {
    let $item = document.getElementById(selectedItem.id);
    if ($item) {
      // 이미 장바구니에 존재하는 item

      // 갱신될 상품 수량
      let tempQuantity = parseInt($item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (tempQuantity <= selectedItem.quantity) {
        // 장바구니 수량 UI 갱신
        updateItemInfo($item, selectedItem, tempQuantity);
        // 실제 상품 수량 갱신
        ProductModel.decreaseQuantity(productId, 1);
      } else {
        alert(MESSAGE_OUT_OF_STOCK);
      }
    } else {
      // 새로 담는 item

      // 장바구니 목록 UI 추가
      createCartItemElement(selectedItem);
      // 실제 상품 수량 갱신
      ProductModel.decreaseQuantity(productId, 1);
    }
    calcCart();
    ProductModel.setLastSelectedItem(productId);
  }
}

/**
 *
 * @param productId 장바구니 목록 id
 * @param change 변경될 개수
 */
export function clickButtonAdd(productId, change) {
  let $itemElem = document.getElementById(productId);
  let selectedItem = ProductModel.findList(productId);

  let tempQuantity = parseInt($itemElem.querySelector('span').textContent.split('x ')[1]) + change;

  if (
    tempQuantity > 0 &&
    tempQuantity <=
      selectedItem.quantity + parseInt($itemElem.querySelector('span').textContent.split('x ')[1])
  ) {
    // 장바구니 수량 UI 갱신
    updateItemInfo($itemElem, selectedItem, tempQuantity);
    // 실제 상품 수량 갱신
    ProductModel.decreaseQuantity(productId, change);
  } else if (tempQuantity <= 0) {
    // 장바구니 수량 UI 갱신
    $itemElem.remove();
    // 실제 상품 수량 갱신
    ProductModel.decreaseQuantity(productId, change);
  } else {
    alert(MESSAGE_OUT_OF_STOCK);
  }
}

/**
 *
 * @param productId 장바구니 목록 id
 * @param change 변경될 개수
 */
export function clickButtonRemove(productId, change) {
  let $itemElem = document.getElementById(productId);
  // 장바구니 수량 UI 갱신
  $itemElem.remove();
  // 실제 상품 수량 갱신
  ProductModel.increaseQuantity(productId, change);
}

/**
 *
 * @param itemElement 장바구니 목록 요소
 * @param selectedItem 판매 상품 정보
 * @param change 변경될 개수
 */
function updateItemInfo($itemElement, selectedItem, change) {
  $itemElement.querySelector('span').textContent = TEXT_CART_ITEM(
    selectedItem.name,
    selectedItem.price,
    change,
  );
}
