import { updateSelectProductList } from './Sel.viewmodel.js';

// prettier-ignore
const ProductModel = (function () {
  // 상품 목록
  const listItems = [
    { id: 'p1', name: '상품1', price: 10000, quantity: 50 },
    { id: 'p2', name: '상품2', price: 20000, quantity: 30 },
    { id: 'p3', name: '상품3', price: 30000, quantity: 20 },
    { id: 'p4', name: '상품4', price: 15000, quantity: 0 },
    { id: 'p5', name: '상품5', price: 25000, quantity: 10 },
  ];

  const DISCOUNT_RATES = {
    p1: 0.1,
    p2: 0.15,
    p3: 0.2,
    p4: 0.05,
    p5: 0.25,
  };

  // 최근 선택한 상품
  let lastSelectedItem;

  const SALE_MESSAGE_INTERVAL = 30000;
  const SUGGEST_MESSAGE_INTERVAL = 60000;

  const SALE_MESSAGE_DELAY = 10000;
  const SUGGEST_MESSAGE_DELAY = 20000;

  const SALE_PROBABILITY = 0.3;

  const SALE_DISCOUNT_PERCENT = 20;
  const SALE_DISCOUNT_RATE = 1 - SALE_DISCOUNT_PERCENT / 100;

  const SUGGEST_DISCOUNT_PERCENT = 5;
  const SUGGEST_DISCOUNT_RATE = 1 - SUGGEST_DISCOUNT_PERCENT / 100;

  const SALE_MESSAGE = (name) =>
    `번개세일! ${name}이(가) ${SALE_DISCOUNT_PERCENT}% 할인 중입니다!`;
  const SUGGEST_MESSAGE = (name) =>
    `${name}은(는) 어떠세요? 지금 구매하시면 ${SUGGEST_DISCOUNT_PERCENT}% 추가 할인!`;

  // 상품 목록 Getter
  function getList() {
    return listItems.map((l) => ({ ...l }));
  }

  // 상품 Getter
  function findList(id) {
    return listItems.find((l) => l.id === id);
  }

  // 상품 수량 Setter
  function increaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item) {
      item.quantity += amount;
      return true;
    }
    return false;
  }

  function decreaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item && item.quantity >= amount) {
      item.quantity -= amount;
      return true;
    }
    return false;
  }

  // 최근 선택한 상품 Setter
  function setLastSelectedItem(item) {
    lastSelectedItem = item;
  }

  /**
   * 랜덤 시간 후부터 30초마다 번개 세일 이벤트를 실행하는 함수.
   * 30% 확률로 판매 가능한 상품 하나를 선택하여 20% 할인 하여
   * 사용자에게 알림을 띄우고 판매 목록 UI 갱신
   */
  function alertItemSale() {
    setTimeout(function () {
      setInterval(function () {
        let randomItem = listItems[Math.floor(Math.random() * listItems.length)];

        if (Math.random() < SALE_PROBABILITY && randomItem.quantity > 0) {
          // 할인가 적용
          randomItem.price = Math.round(randomItem.price * SALE_DISCOUNT_RATE);

          // 알람 발생
          alert(SALE_MESSAGE(randomItem.name));

          // 판매 목록 UI 갱신
          updateSelectProductList(listItems);
        }
      }, SALE_MESSAGE_INTERVAL);
    }, Math.random() * SALE_MESSAGE_DELAY);
  }

  /**
   * 사용자가 최근에 선택한 상품(lastSelectedItem)이 있을 경우,
   * 다른 상품 중 하나를 추천하여 5% 추가 할인을 제안하는 함수.
   * 랜덤 시간 후부터, 60초 간격으로 이벤트 실행
   * 사용자에게 알림을 띄우고 판매 목록 UI 갱신
   */
  function alertItemSuggest() {
    setTimeout(function () {
      setInterval(function () {
        if (lastSelectedItem) {
          // 최근 선택한 상품과 다른 아이템 중 재고가 있는 것을 하나 선택
          let suggestItem = listItems.find(function (item) {
            return item.id !== lastSelectedItem && item.quantity > 0;
          });

          if (suggestItem) {
            // 할인가 적용
            suggestItem.price = Math.round(suggestItem.price * SUGGEST_DISCOUNT_RATE);

            // 알람 발생
            alert(SUGGEST_MESSAGE(suggestItem.name));

            // 판매 목록 UI 갱신
            updateSelectProductList(listItems);
          }
        }
      }, SUGGEST_MESSAGE_INTERVAL);
    }, Math.random() * SUGGEST_MESSAGE_DELAY);
  }

  return {
    DISCOUNT_RATES,
    getList,
    findList,
    increaseQuantity,
    decreaseQuantity,
    alertItemSale,
    alertItemSuggest,
    setLastSelectedItem,
  };
}) ();

export default ProductModel;
