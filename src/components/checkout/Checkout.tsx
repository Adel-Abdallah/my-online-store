import React, { useState } from 'react';
import { CheckoutProps, ClearCartProps } from '../types';
import './checkout.css'


const Checkout: React.FC<CheckoutProps & ClearCartProps> = ({ onCheckout, onClearCart }) => {
    const [showModal, setShowModal] = useState(false);

    const handleCheckout = () => {
        setShowModal(true);
        onCheckout();
        onClearCart(); // Call the onClearCart function to clear the cart
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <button onClick={handleCheckout} className="checkout-btn">Checkout</button>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Thank you for purchasing!</h2>
                        <button onClick={handleCloseModal} className="close-modal-btn">Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Checkout;
