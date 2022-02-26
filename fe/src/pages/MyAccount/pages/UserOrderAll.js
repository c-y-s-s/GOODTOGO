import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { BsShop } from "react-icons/bs";
import storeImage from "../../../images/store_img/22.jpg";

const UserOrderAll = () => {
  return (
    <>
      <div className="card order_List">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <BsShop className="store_Icon" />
            <span className="ms-3 ls-md">豪記港式飲茶</span>
            <div className="store_Category rounded-pill ms-4">飲料</div>
          </div>
          <div className="d-flex align-items-center order_Status_Info">
            <div>訂單編號:</div>
            <span className="ms-2">XXXXXXXX</span>
            <div>|</div>
            <div>待領取</div>
            <div className="order_Status_Button">取消訂單</div>
          </div>
        </div>
        <hr className="my-4"></hr>
        <div className="d-flex justify-content-between align-items-center ls-md">
          <div className="order_Store_Img">
            <img src={storeImage} className="cover-fit" alt="storeImage" />
          </div>
          <div className="flex-grow-1 ms-4">
            <div className="py-1">鴨肉蓋飯</div>
            <div className="py-1">$ 60</div>
          </div>
          <div className="me-4">x 2</div>
          <div className="ms-5">$ 120</div>
        </div>
        <hr className="my-4"></hr>
        <div className="d-flex justify-content-between align-items-center ls-md">
          <div className="order_Store_Img">
            <img src={storeImage} className="cover-fit" alt="storeImage" />
          </div>
          <div className="flex-grow-1 ms-4">
            <div className="py-1">鴨肉蓋飯</div>
            <div className="py-1">$ 60</div>
          </div>
          <div className="me-4">x 2</div>
          <div className="ms-5">$ 120</div>
        </div>
        <hr className="my-4"></hr>
        <div className="d-flex justify-content-between align-items-center ls-md">
          <div className="order_Store_Img">
            <img src={storeImage} className="cover-fit" alt="storeImage" />
          </div>
          <div className="flex-grow-1 ms-4">
            <div className="py-1">鴨肉蓋飯</div>
            <div className="py-1">$ 60</div>
          </div>
          <div className="me-4">x 2</div>
          <div className="ms-5">$ 120</div>
        </div>
        <hr className="my-4"></hr>
        <div className="d-flex justify-content-between align-items-center">
          <span className="flex-grow-1 fz-sm c-grey ls-md">訂單時間: 2021-11-02 01:46:41</span>
          <div className="me-2 fz-sm ls-md">訂單金額:</div>
          <div className="ms-3 order_Amount">NT$ 360</div>
        </div>
      </div>
      
    </>
  );
};

export default UserOrderAll;
