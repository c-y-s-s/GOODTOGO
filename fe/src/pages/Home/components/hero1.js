import React from "react";
import { Link } from "react-router-dom";

// -------- svg圖檔 --------
import { ReactComponent as Hero1Text } from "../images/hero1Text.svg";
import { ReactComponent as Hero1TextArrow } from "../images/hero1TextArrow.svg";

const hero1 = () => {
  return (
    <div className="hero1 m-auto d-grid">
      <div className="hero1-btn ">
        <Link to="/stores" className="d-flex align-items-center">
          <Hero1Text className="hero1-text" />
          <Hero1TextArrow className="hero1-btn-arrow align-self-end" />
        </Link>
      </div>
    </div>
  );
};

export default hero1;
