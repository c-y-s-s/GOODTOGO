import React from "react";
import { Link } from "react-router-dom";

// -------- svg圖檔 --------
import { ReactComponent as Hero1Text } from "../images/hero1Text.svg";
import { ReactComponent as Hero1TextArrow } from "../images/hero1TextArrow.svg";
<<<<<<< HEAD

=======
>>>>>>> 9520249 (doc - 將首頁模組化)
const hero1 = () => {
  return (
    <div className="hero1">
      <div className="row p-0 m-0">
        <div className="container d-flex justify-content-around m-0 p-0">
          <div className="col-lg-1" />
          <div className="col-lg-auto  align-items-center">
            <div className="hero1-btn ">
              <Link to="/store">
                <Hero1Text />
                <Hero1TextArrow className="hero1-btn-arrow" />
              </Link>
            </div>
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  );
};

export default hero1;
