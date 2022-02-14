import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ImFacebook2 } from "react-icons/im";
import { ReactComponent as Logo } from "../../images/logo-face.svg";
import "./Storecheck.scss"


const Storecheck = () => {
  return (
      <div className="container-fluid storereg-con">
        <div className="row">
          <div className="col-lg-4 m-0 p-0">
            <Logo className="" />
          </div>
          <div className="col-lg-7 m-0 p-0">
            <div className="content text-center row justify-content-between gy-0">
              <div className="col-lg-1  m-0 p-0"></div>
              <div className="col-lg-10 mt-3 mb-3 p-0 ">
                <div className="col-lg-12 row m-0 p-0 gy-3 flex-column ">
                  <div className="h6 ">商家註冊</div>
                  {/* -------- 註冊資料開始 -------- */}
                  <div className="label-group d-flex text-start flex-column justify-content-evenly gy-2">
                    
                    {/* -------- 註冊資料結束 -------- */}
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <hr className="col-lg-5" />或<hr className="col-lg-5" />
                    </div>
                    {/* -------- Facebook 登入 -------- */}
                    <button
                      className="col-lg-12 btn-fb-login btn d-flex align-items-center text-center justify-content-center m-0 mb-3"
                    >
                      <ImFacebook2 className="big-icon col-lg-2" />
                      使用 Facebook 註冊<div className="col-lg-2"> </div>
                    </button>

                    <p className=" input-label-title text-grey text-center m-0 mb-3">
                      已經註冊過您的店舖 ,
                      <Link to="/StoreLogin" className="no-link">
                        <span className=" text-yellow ">由這裡立即登入</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-1"></div>
            </div>

            <div className="col-lg-1"></div>
          </div>
        </div>
        <div className="col-lg-1 m-0 p-0"></div>
      </div>

  );
};

export default Storecheck;
