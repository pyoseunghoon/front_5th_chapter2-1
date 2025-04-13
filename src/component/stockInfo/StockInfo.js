let stockInfo;

function createStockInfoElement() {
  stockInfo = document.createElement('div');
  stockInfo.id = 'stock-status';
  stockInfo.className = 'text-sm text-gray-500 mt-2';
  return stockInfo;
}

function renderStockInfo(prodList) {
  let infoMsg = '';
  prodList.forEach(function (item) {
    if (item.q < 5) {
      infoMsg +=
        item.name + ': ' + (item.q > 0 ? '재고 부족 (' + item.q + '개 남음)' : '품절') + '\n';
    }
  });
  stockInfo.textContent = infoMsg;
}

export { stockInfo, createStockInfoElement, renderStockInfo };
