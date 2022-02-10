import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { ReactComponent as Logo } from "../images/navLogo.svg";

import Login from "../pages/Login";
import Register from "../pages/Register";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand shadow">
      <div className="nav container">
        <ul className="navbar-nav">
          <Link to="/">
            <li>
              <Logo className="navLogo" />
            </li>
          </Link>
          <li className="nav-item ms-5">
            <Link to="/about" className="navLink ">
              了解我們
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/joinus" className="navLink">
              申請店家
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/store" className="navLink ">
              立即訂購
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="nav-icons">
            <Link to="/map" className="nav-icon">
              <AiOutlineEnvironment />
            </Link>
          </li>
          <li className="nav-icons">
            <Link to="/member" className="nav-icon">
              <BiUserCircle />
            </Link>
          </li>
          <li className="nav-icons">
            <Link to="/cart" className=" nav-icon">
              <BsBag />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
