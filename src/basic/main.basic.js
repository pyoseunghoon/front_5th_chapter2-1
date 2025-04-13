import cartDisp from '../component/cartDisplay/CartDisplay.js';
import { sel, addBtn } from '../component/sel/Sel.js';
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
import prodList from '../component/sel/Sel.Model.js';

var lastSel;

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
  wrap.appendChild(cartDisp);
  wrap.appendChild(createSumElement());
  wrap.appendChild(sel);
  wrap.appendChild(addBtn);
  wrap.appendChild(createStockInfoElement());

  content.appendChild(wrap);
  root.appendChild(content);
}

function main() {
  // 화면의 element 구성
  createElements();

  // 상품목록 업데이트
  updateSelectProductList();

  calcCart();

  setTimeout(function () {
    setInterval(function () {
      var luckyItem = prodList[Math.floor(Math.random() * prodList.length)];
      if (Math.random() < 0.3 && luckyItem.q > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        // updateSelOpts();
      }
    }, 30000);
  }, Math.random() * 10000);
  setTimeout(function () {
    setInterval(function () {
      if (lastSel) {
        var suggest = prodList.find(function (item) {
          return item.id !== lastSel && item.q > 0;
        });
        if (suggest) {
          alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
          suggest.val = Math.round(suggest.val * 0.95);
          // updateSelOpts();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
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
addBtn.addEventListener('click', function () {
  var selItem = sel.value;
  var itemToAdd = prodList.find(function (p) {
    return p.id === selItem;
  });
  if (itemToAdd && itemToAdd.q > 0) {
    var item = document.getElementById(itemToAdd.id);
    if (item) {
      var newQty = parseInt(item.querySelector('span').textContent.split('x ')[1]) + 1;
      if (newQty <= itemToAdd.q) {
        item.querySelector('span').textContent =
          itemToAdd.name + ' - ' + itemToAdd.val + '원 x ' + newQty;
        itemToAdd.q--;
      } else {
        alert('재고가 부족합니다.');
      }
    } else {
      var newItem = document.createElement('div');
      newItem.id = itemToAdd.id;
      newItem.className = 'flex justify-between items-center mb-2';
      newItem.innerHTML =
        '<span>' +
        itemToAdd.name +
        ' - ' +
        itemToAdd.val +
        '원 x 1</span><div>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="-1">-</button>' +
        '<button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="' +
        itemToAdd.id +
        '" data-change="1">+</button>' +
        '<button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="' +
        itemToAdd.id +
        '">삭제</button></div>';
      cartDisp.appendChild(newItem);
      itemToAdd.q--;
    }
    calcCart();
    lastSel = selItem;
  }

  console.log(
    '[추가]',
    prodList.map((p) => `${p.name}:${p.q}`),
  );
});
cartDisp.addEventListener('click', function (event) {
  var tgt = event.target;
  if (tgt.classList.contains('quantity-change') || tgt.classList.contains('remove-item')) {
    var prodId = tgt.dataset.productId;
    var itemElem = document.getElementById(prodId);
    var prod = prodList.find(function (p) {
      return p.id === prodId;
    });
    if (tgt.classList.contains('quantity-change')) {
      var qtyChange = parseInt(tgt.dataset.change);
      var newQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]) + qtyChange;
      if (
        newQty > 0 &&
        newQty <= prod.q + parseInt(itemElem.querySelector('span').textContent.split('x ')[1])
      ) {
        itemElem.querySelector('span').textContent =
          itemElem.querySelector('span').textContent.split('x ')[0] + 'x ' + newQty;
        prod.q -= qtyChange;
      } else if (newQty <= 0) {
        itemElem.remove();
        prod.q -= qtyChange;
      } else {
        alert('재고가 부족합니다.');
      }
    } else if (tgt.classList.contains('remove-item')) {
      var remQty = parseInt(itemElem.querySelector('span').textContent.split('x ')[1]);
      prod.q += remQty;
      itemElem.remove();
    }
    calcCart();
  }
  console.log(
    '[+, -]',
    prodList.map((p) => `${p.name}:${p.q}`),
  );
});
