import React, { useState } from 'react';
import { CartItemProps } from '../types';
import './cartItem.css'

const CartItem: React.FC<CartItemProps> = ({ item, quantityMap, onUpdateQuantity, onRemoveItem }) => {
    const [itemQuantity, setItemQuantity] = useState<number>(quantityMap[item.id] || 1);


    const handleRemoveItem = () => {
        onRemoveItem(item.id);
    };

    const handleDecreaseQuantity = () => {
        if (itemQuantity > 1) {
          setItemQuantity((prevQuantity) => prevQuantity - 1);
          onUpdateQuantity(item.id, itemQuantity - 1);
        }
      };
      
      const handleIncreaseQuantity = () => {
        setItemQuantity((prevQuantity) => prevQuantity + 1);
        onUpdateQuantity(item.id, itemQuantity + 1);
      };

    return (
        <div className="cart-item">
            <button onClick={handleRemoveItem} className="remove-item-btn">
                <i className="fas fa-times"></i>
            </button>
            <img src={item.imageUrl} alt={item.productName} />
            <div className="cart-item-details">
                <h4>{item.productName}</h4>
                <p className='item-price-small'>${item.unitPrice.toFixed(2)}</p>
            </div>
                <div className="quantity-input-container">
                    <span className="arrow" onClick={handleDecreaseQuantity}>
                        <i className="fas fa-chevron-down"></i>
                    </span>
                    <p className="quantity-input">{itemQuantity}</p>
                    <span className="arrow" onClick={handleIncreaseQuantity}>
                        <i className="fas fa-chevron-up"></i>
                    </span>
                </div>
        </div>
    );
};

export default CartItem;
