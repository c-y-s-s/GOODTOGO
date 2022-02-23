import React from "react";

// -------- svg圖檔 --------

import { ReactComponent as Hero4Text1 } from "../images/hero4Text1.svg";
import { ReactComponent as Hero4Text2 } from "../images/hero4Text2.svg";
import { ReactComponent as Hero4Logo } from "../images/hero4Logo.svg";
import { ReactComponent as Pointer1 } from "../images/hero4Point1.svg";
import { ReactComponent as Pointer2 } from "../images/hero4Point2.svg";
import { ReactComponent as Pointer3 } from "../images/hero4Point3.svg";
import { ReactComponent as BoxImg1 } from "../images/hero4Box1.svg";
import { ReactComponent as BoxImg2 } from "../images/hero4Box2.svg";
import { ReactComponent as BoxImg3 } from "../images/hero4Img3.svg";

//-------- icons --------
import { BiRightArrowAlt } from "react-icons/bi";

const hero4 = () => {
  return (
    <div className="hero4 pt-5 pb-5">
      <div className="container-fluid p-0 m-0 ">
        <div className="hero4-top">
          <div className=" row hero4-title m-lg-0 me-1 ms-1 align-items-center justify-content-center ">
            <Hero4Text1 className="me-lg-4 me-0 p-2 p-lg-0" />
            <Hero4Text2 />
          </div>
        </div>
        <div className="row col-10 hero4-bottom justify-content-around pt-5 m-auto mt-lg-5 mt-2 pb-5  align-items-center">
          <div className="box mb-lg-0 mb-5">
            <Pointer1 className="hero4-pointer" />
            <div className="box-info ">
              <BoxImg1 />
              <div>
                搜尋周邊
                <br />
                等待救援的美食
              </div>
            </div>
          </div>

          <div className="box mb-lg-0 mb-5 mt-3">
            <Pointer2 className="hero4-pointer" />
            <div className="box-info">
              <BoxImg2 />
              <div>前往店家領取餐點</div>
            </div>
          </div>
          <div className="box mb-lg-0 mb-5 mt-3">
            <Pointer3 className="hero4-pointer" />
            <div className="box-info">
              <BoxImg3 />
              <div>救援美食成功</div>
            </div>
          </div>
          <div className="col-lg-3 hero4-btn-group text-light flex-column d-flex align-items-center">
            <Hero4Logo className="mb-3 mb-lg-0" />
            <p className="align-middle m-0 mb-3 mb-lg-0">
              探索您周邊的即期美食
            </p>

            <div className="btn-box text-center align-items-center m-0">
              立即前往
              <BiRightArrowAlt />
            </div>
            {/* <Link to="" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default hero4;
