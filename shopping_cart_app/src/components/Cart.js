import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, updateItemQuantity, selectCartItems, selectCartTotal } from './CartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateItemQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItemFromCart({ id }));
  };

  return (
    <div className='right'>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
                <span>{item.name} - ₹{item.price}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <div>
        <h3>Total: ₹{total}</h3>
      </div>
    </div>
  );
};

export default Cart;