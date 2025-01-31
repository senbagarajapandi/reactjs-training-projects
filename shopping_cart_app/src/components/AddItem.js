import React from 'react';
import { useDispatch } from 'react-redux';
import { addItemToCart } from './CartSlice';

const AddItem = ({ items }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addItemToCart(item));
  };

  return (
    <ul>
      {items.map( (item) => (
        <li>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button onClick={() => {handleAddToCart(item)}}>Add to Cart</button>
        </li>
      ))
      }
    </ul>
  );
};

export default AddItem;