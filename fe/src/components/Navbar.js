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
  const { loginMember, setLoginMember } = useAuth();

  return (
<<<<<<< HEAD
    <nav className="navbar navbar-expand shadow sticky-top">
      <div className="nav container-fluid">
        <ul className="navbar-nav">
          <li>
            <img
              className="navLogo navbar-brand"
              src={require("../images/navLogo.png")}
              alt="logo"
            ></img>
          </li>
          <li className="nav-item">
            <Link to="/about" className="navLink ">
              了解我們
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/member" className="navLink">
              會員中心
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/store" className="navLink ">
              立即訂購
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ">
          <li className="nav-item  ">
            <Link to="/map" className=" navIcon">
              <AiOutlineEnvironment />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className=" navIcon">
              <BiUserCircle />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className=" navIcon">
              <BsBag />
            </Link>
          </li>
        </ul>
=======
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
>>>>>>> test_release
      </div>
    </div>
  );
};

export default Navbar;
