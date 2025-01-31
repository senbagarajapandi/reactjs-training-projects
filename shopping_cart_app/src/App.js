import React from 'react';
import AddItem from './components/AddItem';
import Cart from './components/Cart';

const App = () => {
  const items = [
    { id: 1, name: 'Item 1', price: 10 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 },
  ];

  return (
    <div>
      <h1>Shopping Cart System</h1>
      <div className='container'>
        <div className='left'>
          <h2>Add Cart</h2>
          <AddItem items={items} />
        </div>
        <Cart />
      </div>
    </div>
  );
};

export default App;