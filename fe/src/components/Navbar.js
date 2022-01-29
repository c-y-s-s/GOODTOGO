import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsBag } from "react-icons/bs";

import Login from "../pages/Login";
import Register from "../pages/Register";
require("../images/navLogo.png");

const Navbar = () => {
  return (
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
            <Link to="/map" className=" navIcon">
              <BiUserCircle />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/cart" className=" navIcon">
              <BsBag />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
