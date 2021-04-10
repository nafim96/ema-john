import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../Product/Product";

const ProductDetail = () => {
  const { key } = useParams();
  const [products, setProducts] = useState({});
  useEffect(() => {
    fetch(`https://tranquil-beyond-11065.herokuapp.com/singleProduct/${key}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [key]);
  return (
    <div>
      <h1>Product Details Here</h1>
      <Product showAddToCart={false} product={products}></Product>
    </div>
  );
};

export default ProductDetail;
