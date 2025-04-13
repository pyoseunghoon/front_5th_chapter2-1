import ProductModel from '../sel/Sel.Model.js';
import { createCartItemElement } from './CartDisplay.js';
import { calcCart } from './CartDisplay.viewmodel.js';
/**
 * 사용자가 선택한 상품을 장바구니에 담는 기능
 * @param selId 판매 상품 Id
 * @param selectedItem 판매 상품 정보
 */
export function addItem(selId, selectedItem) {
  // 선택한 item의 재고 존재시
  if (selectedItem && selectedItem.q > 0) {
    let item = document.getElementById(selectedItem.id);
    if (item) {
      // 이미 장바구니에 존재하는 item

      // 갱신될 상품 수량
      let tempQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (tempQuantity <= selectedItem.q) {
        // 장바구니 수량 UI 갱신
        updateItemInfo(item, selectedItem, tempQuantity);
        // 실제 상품 수량 갱신
        ProductModel.decreaseQuantity(selId, 1);
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      // 새로 담는 item

      // 장바구니 목록 UI 추가
      createCartItemElement(selectedItem);
      // 실제 상품 수량 갱신
      ProductModel.decreaseQuantity(selId, 1);
    }
    calcCart();
    ProductModel.setLastSel(selId);
  }
}

function updateItemInfo(itemElement, selectedItem, change) {
  itemElement.querySelector('span').textContent =
    selectedItem.name + ' - ' + selectedItem.val + '원 x ' + change;
}
