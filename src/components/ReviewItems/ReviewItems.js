import React from 'react';

const ReviewItems = (props) => {
    const { name, quantity, img, price, key } = props.product;
    
    return (
        <div className="product-list">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-title">
                <h2>{name}</h2>
                <h3>price ${price}</h3>
                <h4>Quantity: {quantity}</h4>
                <button className='btn btn-success' onClick={() => props.removeProduct(key)}>Remove</button>
            </div>

        </div>
    );
};

export default ReviewItems;