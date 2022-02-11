import React from "react";
import { Link } from "react-router-dom";

// -------- icons --------
import { AiOutlineEnvironment } from "react-icons/ai";
import { RiUserSmileLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { ReactComponent as Logo } from "../images/navLogo.svg";

const Navbar = ({ auth }) => {
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
            {auth ? (
              <>
                <Link to="/member" className="nav-icon">
                  <RiUserSmileLine className="me-2" />{" "}
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-icon">
                  <BiUserCircle className="me-2" />
                </Link>
              </>
            )}
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
