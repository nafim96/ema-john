import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import happyImage from "../../images/giphy.gif";
import {
    getDatabaseCart,
    removeFromDatabaseCart
} from "../../utilities/databaseManager";
import Cart from "../Cart.js/Cart";
import ReviewItems from "../ReviewItems/ReviewItems";

const Review = () => {
  const [cart, setCart] = useState([]);
  const [placeOrder, setPlaceOrder] = useState(false);
  const history = useHistory();

  const handlePlaceOrder = () => {
    history.push("/shipment");
    // setCart([]);
    // setPlaceOrder(true);
    // processOrder();
  };

  const removeProduct = (productKey) => {
    const newCart = cart.filter((pd) => pd.key !== productKey);
    setCart(newCart);
    removeFromDatabaseCart(productKey);
  };

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch("https://tranquil-beyond-11065.herokuapp.com/productsByKeys", {
      method: "POST",
      body: JSON.stringify(productKeys),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data)
      });

  }, []);

  let thankYou;
  if (placeOrder) {
    thankYou = <img src={happyImage} alt="" />;
  }
  return (
    <div className="shop-container">
      <div className="product-container">
        {cart.map((pd) => (
          <ReviewItems
            key={pd.key}
            product={pd}
            removeProduct={removeProduct}
          ></ReviewItems>
        ))}
        {thankYou}
      </div>
      <div className="cart-container">
        <Cart cart={cart}></Cart>
        <div>
          <button onClick={handlePlaceOrder} className="btn btn-success">
            Shipment CheckOut
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
