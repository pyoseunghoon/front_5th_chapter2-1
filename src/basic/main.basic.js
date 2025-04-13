import { createCartDispElement, getCartDispElement } from '../component/cartDisplay/CartDisplay.js';
import {
  createSelElement,
  createAddBtnElement,
  getSelElement,
  getAddBtnElement,
} from '../component/sel/Sel.js';
import { createStockInfoElement } from '../component/stockInfo/StockInfo.js';
import { updateSelectProductList } from '../component/sel/Sel.viewmodel.js';
import { updateStockInfo } from '../component/stockInfo/StockInfo.viewmodel.js';
import {
  createSumElement,
  createSumText,
  createDiscountText,
  createPointText,
} from '../component/sum/Sum.js';
import createTitleElement from '../component/title/Title.js';
import { updateCartStatus, updateTotalDiscountRate } from '../component/sum/Sum.viewmodel.js';
import ProductModel from '../component/sel/Sel.Model.js';

/**
 * 화면을 구성하는 기본 element를 만든다.
 */
const createBasicElement = {
  root: () => {
    const root = document.getElementById('app');
    return root;
  },
  content: () => {
    const content = document.createElement('div');
    content.className = 'bg-gray-100 p-8';
    return content;
  },
  wrap: () => {
    const wrap = document.createElement('div');
    wrap.className =
      'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
    return wrap;
  },
};

/**
 * 화면을 구성하는 element 생성
 */
function createElements() {
  const root = createBasicElement.root();
  const content = createBasicElement.content();
  const wrap = createBasicElement.wrap();

  wrap.appendChild(createTitleElement());
  wrap.appendChild(createCartDispElement());
  wrap.appendChild(createSumElement());
  wrap.appendChild(createSelElement());
  wrap.appendChild(createAddBtnElement());
  wrap.appendChild(createStockInfoElement());

  content.appendChild(wrap);
  root.appendChild(content);
}

function main() {
  // 화면의 element 구성
  createElements();

  // 상품목록 업데이트
  updateSelectProductList(ProductModel.getList());

  calcCart();

  // 상품 세일 제안 기능
  ProductModel.alertItemSale();

  // 상품 제안 기능
  ProductModel.alertItemSuggest();
}

function calcCart() {
  // 장바구니 정보 계산
  updateCartStatus(); // 사용자의 장바구니 목록의 상태 정보 갱신 ( 기본금액, 할인된금액, 구매한 상품 개수 )
  updateTotalDiscountRate(); // 적용된 할인율 개산

  // 금액 및 할인율 UI Update
  createSumText();
  createDiscountText();

  // 재고 정보 UI Update
  updateStockInfo();
  createPointText();
}

main();

document.addEventListener('click', (event) => {
  const target = event.target;
  if (target.id === getAddBtnElement().id) {
    let selId = getSelElement().value;
    let selectedItem = ProductModel.findList(selId);

    // 선택한 item의 재고 존재시
    if (selectedItem && selectedItem.q > 0) {
      let item = document.getElementById(selectedItem.id);
      if (item) {
        // 이미 장바구니에 존재하는 item

        // 갱신될 상품 수량
        let tempQuantity = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
        if (tempQuantity <= selectedItem.q) {
          item.querySelector('span').textContent =
            selectedItem.name + ' - ' + selectedItem.val + '원 x ' + tempQuantity;
          selectedItem.q--;
        } else {
          alert('재고가 부족합니다.');
        }
      } else {
        // 새로 담는 item
        let newItem = document.createElement('div');
        newItem.id = selectedItem.id;
        newItem.className = 'flex justify-between items-center mb-2';
        newItem.innerHTML =
          '<span>' +
          selectedItem.name +
          ' - ' +
          selectedItem.val +
          '원 x 1</span><div>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selectedItem.id +
          '" data-change="-1">-</button>' +
          '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
          selectedItem.id +
          '" data-change="1">+</button>' +
          '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
          selectedItem.id +
          '">삭제</button></div>';
        getCartDispElement().appendChild(newItem);
        selectedItem.q--;
      }
      calcCart();
      ProductModel.setLastSel(selId);
    }
  }

  if (target.classList.contains('quantity-change') || target.classList.contains('remove-item')) {
    let prodId = target.dataset.productId;
    let itemElem = document.getElementById(prodId);
    let selectedItem = ProductModel.findList(prodId);
    let change;

    // 장바구니 + 버튼
    if (target.classList.contains('quantity-change')) {
      change = parseInt(target.dataset.change);
      let tempQuantity =
        parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + change;

      if (
        tempQuantity > 0 &&
        tempQuantity <=
          selectedItem.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + tempQuantity;
        selectedItem.q -= change;
      } else if (tempQuantity <= 0) {
        itemElem.remove();
        selectedItem.q -= change;
      } else {
        alert('재고가 부족합니다.');
      }
    }

    // 장바구니 - 버튼
    if (target.classList.contains('remove-item')) {
      change = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      selectedItem.q += change;
      itemElem.remove();
    }

    calcCart();
  }
});
