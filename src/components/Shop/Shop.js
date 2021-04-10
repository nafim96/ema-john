import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  addToDatabaseCart,
  getDatabaseCart
} from "../../utilities/databaseManager";
import Cart from "../Cart.js/Cart";
import Product from "../Product/Product";
import "./Shop.css";

const Shop = () => {
  //   const first10 = fakeData.slice(0, 10);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  console.log("get search", search);
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    fetch("https://tranquil-beyond-11065.herokuapp.com/product?search="+search)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [search]);

  useEffect(() => {
    const saveCart = getDatabaseCart();
    const productKeys = Object.keys(saveCart);
    fetch("https://tranquil-beyond-11065.herokuapp.com/productsByKeys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productKeys),
    })
      .then((res) => res.json())
      .then((data) => {
        setCart(data);
        console.log("get data from 25 line:", data);
      });
  }, []);

  const handleAddProduct = (product) => {
    const toBeAddedKey = product.key;
    const sameProduct = cart.find((pd) => pd.key === toBeAddedKey);
    let count = 1;
    let newCart;
    if (sameProduct) {
      count = sameProduct.quantity + 1;
      sameProduct.quantity = count;
      const others = cart.filter((pd) => pd.key !== toBeAddedKey);
      newCart = [...others, sameProduct];
    } else {
      product.quantity = 1;
      newCart = [...cart, product];
    }
    setCart(newCart);
    addToDatabaseCart(product.key, count);
  };
  return (
    <div className="shop-container">
      <div className="product-container">
        <input
          type="text"
          onBlur={handleSearch}
          className="search-container"
          placeholder="Search here"
        />
        {products.map((product) => (
          <Product
            key={product.key}
            showAddToCart={true}
            handleAddProduct={handleAddProduct}
            product={product}
          ></Product>
        ))}
      </div>
      <div className="cart-container">
        <Cart cart={cart}>
          <Link to="/review">
            <button className="btn btn-success">Order Review</button>
          </Link>
        </Cart>
      </div>
    </div>
  );
};

export default Shop;
