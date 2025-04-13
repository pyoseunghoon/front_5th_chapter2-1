const sel = document.createElement('select');
const addBtn = document.createElement('button');
sel.id = 'product-select';
sel.className = 'border rounded p-2 mr-2';
addBtn.id = 'add-to-cart';
addBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
addBtn.textContent = '추가';

function renderSelectProductList(list) {
  sel.innerHTML = '';
  list.forEach(function (item) {
    let opt = document.createElement('option');
    opt.value = item.id;
    opt.textContent = item.name + ' - ' + item.val + '원';
    if (item.q === 0) opt.disabled = true;
    sel.appendChild(opt);
  });
}

export { sel, addBtn, renderSelectProductList };
