import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../App";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";
import ProcessPayment from "../ProcessPayment/ProcessPayment";
import "./Shipment.css";

const Shipment = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [userLoggedIn, setUserLoggedIn] = useContext(UserContext);
  const [shippingData, setShippingData]=useState(null)
  const onSubmit = (data) => {
    setShippingData(data)
  };

  const handleProcessPayment=(paymentId)=>{
    const saveCart = getDatabaseCart();
    const orderDetails = {
      ...userLoggedIn,
      products: saveCart,
      shipment: shippingData,
      paymentId,
      orderTime: new Date(),
    };
    fetch("https://tranquil-beyond-11065.herokuapp.com/addOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("Ordered Successfully Done");
          processOrder();
        }
      });
  }

  console.log(watch("example"));

  return (
    <div className="row">
      <div style={{display: shippingData ? "none": "block"}} className="col-md-6">
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            defaultValue={userLoggedIn.name}
            ref={register({ required: true })}
            placeholder="Your name"
          />
          {errors.name && <span className="error">Name is required</span>}
          <input
            name="email"
            ref={register({ required: true })}
            placeholder="Your email"
          />
          {errors.email && <span className="error">Email is required</span>}
          <input
            name="address"
            ref={register({ required: true })}
            placeholder="Your Address"
          />
          {errors.address && <span className="error">Address is required</span>}
          <input
            name="phone"
            ref={register({ required: true })}
            placeholder="Your phone"
          />
          {errors.phone && <span className="error">Phone is required</span>}

          <input type="submit" />
        </form>
      </div>
      <div  style={{display: shippingData ? "block": "none"}} className="col-md-6">
        <h1>Please Pay for me I'm hungry</h1>
        <ProcessPayment paymentSuccess={handleProcessPayment}></ProcessPayment>
      </div>
    </div>
  );
};

export default Shipment;
