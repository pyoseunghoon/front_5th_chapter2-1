import React from 'react';
import ProductSelect from './ui/ProductSelect';
import SumView from './ui/SumView';
import StockInfoView from './ui/StockInfoView';
import CartList from './ui/CartList';

const App = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <h1 className="text-2xl font-bold mb-4">장바구니</h1>
        <CartList />
        <SumView />
        <ProductSelect />
        <StockInfoView />
      </div>
    </div>
  );
};

export default App;
