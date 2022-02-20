import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ReactComponent as SliderLeft } from "../images/slider-left.svg";
// import { ReactComponent as SliderRight } from "../images/slider-right.svg";
import Slider1 from "../images/slider1.svg";

const Slider = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className="slider d-grid">
        <div className="slider-box text-center">
          <img src={Slider1} alt="新年" />
        </div>
        <div className="slider-point list-unstyled">
          <li> </li>
          <li> </li>
          <li> </li>
        </div>
        <div className="controller">
          <button className="btn arrow-bg text-center p-0 m-0">
            <IoIosArrowBack className="arrow-btn pe-1" />
          </button>
        </div>
        <div className="controller">
          <button className="btn arrow-bg text-center p-0 m-0">
            <IoIosArrowForward className="arrow-btn ps-1" />
          </button>
        </div>

        {/* <div className="controller d-flex ps-5 pe-5">
          <button className="btn arrow-bg aligh-items-center p-0 m-0">
            <IoIosArrowBack className="arrow-btn pe-1" />
          </button>

          <div className="container lightbox p-0">
            <img src={Slider1} alt="新年" />
          </div>
          <button className="btn arrow-bg aligh-items-center p-0 m-0">
            <IoIosArrowForward className="arrow-btn ps-1" />
          </button>
        </div>
        <div className="slider-point list-unstyled d-flex justify-content-center">
          <li></li>
          <li></li>
          <li></li>
        </div> */}
      </div>
    </>
  );
};

export default Slider;
