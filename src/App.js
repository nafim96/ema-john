
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Inventory from './components/Inventory/Inventory';
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';


function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Switch>
          <Router path="/shop">
            <Shop></Shop>
          </Router>
          <Router path="/review">
            <Review></Review>
          </Router>
          <Router path="/inventory">
            <Inventory></Inventory>
          </Router>
          <Router exact path="/">
            <Shop></Shop>
          </Router>
          <Router path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Router>
          <Router path="*">
            <NotFound></NotFound>
          </Router>
        </Switch>
      </Router>

    </div>
  );
}

export default App;
