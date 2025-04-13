import { updateCartStatus, updateTotalDiscountRate } from '../sum/Sum.viewmodel.js';
import { createDiscountText, createPointText, createSumText } from '../sum/Sum.js';
import { updateStockInfo } from '../stockInfo/StockInfo.viewmodel.js';

function calcCart() {
  // 장바구니 정보 계산
  updateCartStatus(); // 사용자의 장바구니 목록의 상태 정보 갱신 ( 기본금액, 할인된금액, 구매한 상품 개수 )
  updateTotalDiscountRate(); // 적용된 할인율 개산

  // 금액 UI Update
  createSumText();
  // 할인율 UI Update
  createDiscountText();

  // 재고 정보 UI Update
  updateStockInfo();
  // 포인트 UI Update
  createPointText();
}

export { calcCart };
