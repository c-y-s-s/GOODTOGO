import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/auth";
import Popover from "./_popover";
import MenuToggle from "./_menuToggle";

// -------- icons --------
import { FiMapPin } from "react-icons/fi";
import { ReactComponent as Logo } from "../images/navLogo.svg";
import { ReactComponent as ShoppingBag } from "../images/shopping-bag-icon.svg";

const Navbar = (props) => {
  return (
    <div className="container-fluid navbar justify-content-center sticky-top shadow">
      <div className="nav-content">
        <div>
          <Link to="/">
            <Logo className="nav-logo" />
          </Link>
        </div>
        <div className="sm-logo-left align-items-center">
          <Link to="/shoppingcart" className="sm-icon">
            <ShoppingBag />
          </Link>
          <MenuToggle />
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-link">
            關於我們
          </Link>

          <Link
            to="/stores"
            className="nav-link"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            立即訂購
          </Link>
          <Link to="/joinus" className="nav-link">
            店家申請
          </Link>
          {/* <Link to="/faq" className="nav-link">
            常見問題
          </Link> */}
        </div>

        <div className="nav-icons">
          <Popover />
          <Link to="/shoppingcart" className="nav-icon shopping-cart">
            <div className="shopping-cart-number">1</div>
            <ShoppingBag className="shopping-cart-icon" />
            <div className="shopping-cart-products">1</div>
          </Link>

          <Link to="/map" className="nav-icon">
            <FiMapPin />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
