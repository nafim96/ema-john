import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart.js/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';
import happyImage from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([])
    const [placeOrder, setPlaceOrder] = useState(false);

    const handlePlaceOrder = () => {
        setCart([])
        setPlaceOrder(true)
        processOrder()
    }

    const removeProduct = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(() => {
        const saveCart = getDatabaseCart()
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product;
        })
        setCart(cartProducts)
    }, [])

    let thankYou;
    if (placeOrder) {
        thankYou = <img src={happyImage} alt="" />
    }
    return (
        <div className="shop-container">
            <div className='product-container'>
                {
                    cart.map(pd =>
                        <ReviewItems
                            key={pd.key}
                            product={pd}
                            removeProduct={removeProduct}
                        ></ReviewItems>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}></Cart>
                <div>
                    <button onClick={handlePlaceOrder} className="btn btn-success">Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Review;