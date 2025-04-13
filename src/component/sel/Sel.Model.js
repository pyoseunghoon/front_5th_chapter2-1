import { updateSelectProductList } from './Sel.viewmodel.js';

// prettier-ignore
const ProductModel = (function () {
  const list = [
    { id: 'p1', name: '상품1', val: 10000, q: 50 },
    { id: 'p2', name: '상품2', val: 20000, q: 30 },
    { id: 'p3', name: '상품3', val: 30000, q: 20 },
    { id: 'p4', name: '상품4', val: 15000, q: 0 },
    { id: 'p5', name: '상품5', val: 25000, q: 10 },
  ];
  let lastSel;

  function getList() {
    return list.map((l) => ({ ...l }));
  }

  function findList(id) {
    return list.find((l) => l.id === id);
  }

  function increaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item) {
      item.q += amount;
      return true;
    }
    return false;
  }

  function decreaseQuantity(id, amount=1) {
    const item = findList(id);

    if (item && item.q >= amount) {
      item.q -= amount;
      return true;
    }
    return false;
  }


  function getLastSel() {
    return lastSel;
  }

  function setLastSel(item) {
    lastSel = item;
  }

  function alertItemSale() {
    setTimeout(function () {
      setInterval(function () {
        let luckyItem = list[Math.floor(Math.random() * list.length)];

        if (Math.random() < 0.3 && luckyItem.q > 0) {
          luckyItem.val = Math.round(luckyItem.val * 0.8);
          alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');

          updateSelectProductList(list);
        }
      }, 30000);
    }, Math.random() * 10000);
  }

  function alertItemSuggest() {
    setTimeout(function () {
      setInterval(function () {
        if (lastSel) {
          let suggest = list.find(function (item) {
            return item.id !== lastSel && item.q > 0;
          });

          if (suggest) {
            alert(suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!');
            suggest.val = Math.round(suggest.val * 0.95);

            updateSelectProductList(list);
          }
        }
      }, 60000);
    }, Math.random() * 20000);
  }

  return {
    getList,
    findList,
    increaseQuantity,
    decreaseQuantity,
    alertItemSale,
    alertItemSuggest,
    setLastSel,
  };
}) ();

export default ProductModel;
