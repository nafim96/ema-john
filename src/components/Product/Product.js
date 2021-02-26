import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    console.log(props.newProduct);
    const { name, price, seller, stock, img } = props.newProduct
    return (
        <div className="product-list">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-title">
                <h3>{name}</h3>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                <button className="main-button"> <FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>

            </div>
        </div>
    );
};

export default Product;