import React from "react";
// -------- svg圖檔 --------
import { ReactComponent as Hero5Text } from "../images/hero5Text.svg";
import { ReactComponent as Hero5TextSm } from "../images/hero5Text-sm.svg";
import { ReactComponent as Hero5Num1 } from "../images/hero5Num1.svg";
import { ReactComponent as Hero5Num2 } from "../images/hero5Num2.svg";

const hero5 = () => {
  return (
    <div className="hero5 container-fluid hero5-bg m-auto p-0">
      <div className="hero5-main-content text-center">
        <Hero5Text className="col-lg-10 mt-lg-5 mb-lg-5 col-12 hero5-text" />
        <Hero5TextSm className="hero5-text-sm" />
        <div className="hero5-static d-flex flex-wrap col-lg-10 align-items-center m-auto justify-content-around">
          <div className="hero5-static-1 col-lg-5 col-12 text-center ">
            <Hero5Num1 className="col-7" />
            <div className="hero-5-static-text text-light mt-lg-4">
              累計會員
            </div>
            <div className="hero-5-static-text-sm text-light mt-lg-4">
              註冊 GOODTOGO 人次{" "}
            </div>
          </div>
          <div className="hero5-static-2 col-lg-5 col-12 text-center">
            <Hero5Num2 className="col-7" />
            <div className="hero-5-static-text text-light  mt-lg-4">
              即期美食
            </div>
            <div className="hero-5-static-text-sm text-light  mt-lg-4">
              於丟棄之前成功被拯救
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default hero5;
