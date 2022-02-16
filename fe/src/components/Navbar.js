import React, { useState } from "react";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

// -------- icons --------
import { AiOutlineEnvironment } from "react-icons/ai";
import { BiUserCircle } from "react-icons/bi";
import { BsBag } from "react-icons/bs";
import { ReactComponent as Logo } from "../images/navLogo.svg";

const Navbar = ({ auth }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <navbar className="container-fluid navbar justify-content-center sticky-top">
      <div className="nav-content">
        <div>
          <Link to="/">
            <Logo className="nav-logo" />
          </Link>
        </div>
        <div className="sm-logo-left">
          <Link to="/cart" className="sm-icon">
            <BsBag />
          </Link>
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={22}
            color="#668C4A"
            rounded
          />
          <div className="side-menu"></div>
        </div>
        <div className="nav-links">
          <Link to="/about" className="nav-link">
            關於我們
          </Link>
          <Link to="/joinus" className="nav-link">
            店家申請
          </Link>
          <Link to="/store" className="nav-link">
            立即訂購
          </Link>
          <Link to="/faq" className="nav-link">
            常見問題
          </Link>
        </div>

        <div className="nav-icons">
          {auth ? (
            <>
              <Link to="/my_account">
                <div>圖</div>
              </Link>
            </>
          ) : (
            <>
              <Link to="/auth/login">
                <BiUserCircle role="button" className="nav-icon" />
              </Link>
            </>
          )}

          <Link to="/cart" className="nav-icon">
            <BsBag />
          </Link>
          <Link to="/map" className="nav-icon">
            <AiOutlineEnvironment />
          </Link>
        </div>
      </div>
    </navbar>
    //   <nav
    //     className="navbar container-fluid
    //  shadow justify-content-center"
    //   >
    //     <div className="nav d-flex text-center justify-content-between ">
    //       <Link to="/">
    //         <Logo className="navLogo mt-2" />
    //       </Link>
    //       <div className="d-flex justify-content-end col-sm-4 col-lg-1 sm-nav">
    //         <Link to="/cart" className="sm-icon no-link text-green">
    //           <BsBag />
    //         </Link>
    //         <Hamburger
    //           className="hamburger"
    //           toggled={isOpen}
    //           toggle={setOpen}
    //           size={22}
    //           color="#668C4A"
    //           rounded
    //         />
    //       </div>
    //       <ul className="nav-links m-0">
    //         <li className="nav-item">
    //           <Link to="/about" className="navLink text-dark-grey">
    //             了解我們
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/joinus" className="navLink">
    //             申請店家
    //           </Link>
    //         </li>
    //         <li className="nav-item">
    //           <Link to="/store" className="navLink ">
    //             立即訂購
    //           </Link>
    //         </li>
    //       </ul>
    //       <ul className="nav-links m-0">
    //         <li className="nav-icons">
    // <Link to="/map" className="nav-icon">
    //   <AiOutlineEnvironment />
    // </Link>
    //         </li>
    //         <li className="nav-icons">
    //           <Link to="/auth/login">
    //             <BiUserCircle role="button" className="nav-icon" />
    //           </Link>
    //         </li>
    //         <li className="nav-icons">
    //           <Link to="/cart" className="nav-icon">
    //             <BsBag />
    //           </Link>
    //         </li>
    //       </ul>
    //     </div>
    //   </nav>
  );
};

export default Navbar;
