import React, { useEffect } from 'react';
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from '../stores/useCartStore';

const ProductSelect: React.FC = () => {
  const listItems = useProductStore((state) => state.listItems);
  const lastSelectedItem = useProductStore((state) => state.lastSelectedItem);
  const setLastSelectedItem = useProductStore((state) => state.setLastSelectedItem);

  const addToCart = useCartStore((state) => state.addToCart);

  // 변경되었을 때 선택 상품 id 저장
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLastSelectedItem(e.target.value);
  };

  const handleAddClick = () => {
    if (!lastSelectedItem) return;
    const selected = listItems.find((item) => item.id === lastSelectedItem);
    if (!selected || selected.quantity === 0) return;

    addToCart(selected);
  };

  useEffect(() => {
    if (listItems.length > 0 && !lastSelectedItem) {
      // 초기 값으로 첫번째 상품을 지정
      setLastSelectedItem(listItems[0].id);
    }
  }, [listItems, lastSelectedItem]);

  return (
    <div className="mb-2">
      <select
        id="product-select"
        className="border rounded p-2 mr-2"
        value={lastSelectedItem ?? ''}
        onChange={handleSelectChange}
      >
        {listItems.map((item) => (
          <option key={item.id} value={item.id} disabled={item.quantity === 0}>
            {item.name} - {item.price}원
          </option>
        ))}
      </select>

      <button
        id="add-to-cart"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleAddClick}
      >
        추가
      </button>
    </div>
  );
};

export default ProductSelect;
