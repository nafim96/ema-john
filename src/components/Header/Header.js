import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import logo from "../../images/logo.png";
import "./Header.css";

const Header = () => {
    const [userLoggedIn, setUserLoggedIn]= useContext(UserContext)
  return (
    <div className="header">
      <img src={logo} alt="" />

      <nav>
        <Link to="/shop">Shope</Link>
        <Link to="/review">Order Review</Link>
        <Link to="/inventory">Manage Inventory</Link>
        <button onClick={()=>setUserLoggedIn({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
