import React from "react";
import { Link } from "react-router-dom";

// -------- svg圖檔 --------
import { ReactComponent as Hero1Text } from "../images/hero1Text.svg";
import { ReactComponent as Hero1TextArrow } from "../images/hero1TextArrow.svg";
import { ReactComponent as Hero1SmText1 } from "../images/hero1-sm-text1.svg";
import { ReactComponent as Hero1SmText2 } from "../images/hero1-sm-text2.svg";
import { ReactComponent as Hero1SmText3 } from "../images/hero1-sm-text3.svg";
import { ReactComponent as Hero1SmGo } from "../images/hero1-sm-go.svg";
import { ReactComponent as Hero1SmArrow } from "../images/hero1-sm-arrow.svg";

const hero1 = () => {
  return (
    <div className="hero1 m-auto d-grid">
      <div className="hero1-btn m-auto col-12">
        <Link to="/stores" className="d-flex justify-content-center">
          <Hero1Text
            className="hero1-text"
            //viewBox="10 10 1050 300"
            width="85vw"
            height="33vh"
          />
          <Hero1TextArrow
            className="hero1-btn-arrow align-self-end"
            width="100"
            height="65"
            // viewBox="0 0 45 50"
            // preserveAspectRatio="xMidYMin slice"
          />
        </Link>
      </div>
      <div className="hero1-sm-btn">
        <Link to="/stores" className="d-flex justify-content-center flex-wrap">
          <Hero1SmText1 className="mb-4 " />
          <Hero1SmText2 className="mb-4" />
          <Hero1SmText3 className="mb-4" />
          <div className="d-flex align-items-center">
            <Hero1SmGo className="me-4" />
            <Hero1SmArrow className="btn-sm-arrow" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default hero1;
