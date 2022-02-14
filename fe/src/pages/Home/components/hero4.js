import React from "react";

// -------- svg圖檔 --------
import { ReactComponent as Hero4Text } from "../images/hero4Text.svg";
import { ReactComponent as Hero4Logo } from "../images/hero4Logo.svg";

//-------- icons --------
import { BiRightArrowAlt } from "react-icons/bi";

const hero4 = () => {
  return (
    <div className="hero4 pt-5">
      <div className="container-fluid p-0 m-0 ">
        <div className="row hero4-top justify-content-around ">
          <div className="col-lg-2 p-0 m-0"></div>
          <div className="col-auto hero4-title p-0 m-0 mt-5">
            <Hero4Text className=" mt-5" />
          </div>
          <div className="col-lg-2 p-0 m-0"></div>
        </div>
        <div className="row hero4-bottom justify-content-around pt-5 mt-3">
          <div className="col-lg-1"></div>
          <div className="box"></div>
          <div className="box"></div>
          <div className="box"></div>
<<<<<<< HEAD
          <div className="col-lg-3 hero4-btn-group  text-light flex-column d-flex justify-content-evenly align-items-center">
=======
          <div className="col-lg-3 hero4-btn-group flex-column d-flex justify-content-evenly align-items-center">
>>>>>>> 9520249 (doc - 將首頁模組化)
            <Hero4Logo />
            <p className="align-middle m-0">探索您周邊的即期美食</p>

            <div className="btn-box text-center  align-items-center m-0">
              <div className="">
                立即前往
                <BiRightArrowAlt />
              </div>
            </div>
            {/* <Link to="" /> */}
          </div>
          <div className="col-lg-1"></div>
        </div>
      </div>
    </div>
  );
};

export default hero4;
