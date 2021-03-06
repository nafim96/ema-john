import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { name, price, seller, stock, img, key } = props.product
    const handler = props.handleAddProduct;
    return (
        <div className="product-list">
            <div className="product-img">
                <img src={img} alt="" />
            </div>
            <div className="product-title">
                <h3><Link to={"/product/" + key}>{name}</Link></h3>
                <p><small>by: {seller}</small></p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddToCart === true && <button
                    onClick={() => handler(props.product)} className="main-button">
                    <FontAwesomeIcon icon={faShoppingCart} /> Add to cart
                </button>}

            </div>
        </div>
    );
};

export default Product;