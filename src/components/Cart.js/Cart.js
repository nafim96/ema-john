import React from 'react';

import './Cart.css';

const Cart = (props) => {
    const cart = props.cart;
    const total = cart.reduce((total, product) => total + product.price * product.quantity, 0)

    // let total = 0;
    // for (let i = 0; cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price;
    // }
    const formatNumber = (num) => {
        const precision = num.toFixed(2);
        return Number(precision);
    }

    let shipping = 0;
    if (total > 45) {
        shipping = 0;
    }
    else if (total > 15) {
        shipping = 4.99
    }
    else if (total > 0) {
        shipping = 12.50;
    }
    const tax = formatNumber(total * .10);
    const grandTotal = total + shipping + tax;
    return (
        <div>
            <div className="cart-container">
                <h1 className="text-success bg-danger rounded p-2">Order Summery</h1>
                <h4>Ordered Items: {cart.length}</h4>
                <h4>Product Price: {formatNumber(total)}</h4>
                <h4><small>Shipping: {shipping}</small></h4>
                <h4><small>Tax: {tax}</small></h4>
                <h4>Total: {formatNumber(grandTotal)}</h4>
            </div>
            <div className="order-review">
                {
                    props.children
                }
            </div>
        </div>
    );
};

export default Cart;