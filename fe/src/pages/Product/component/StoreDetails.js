import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const StoreDetails = ({ name, address, tel_no }) => {
  return (
    <div>
      <div className="container store-data">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 pe-lg-3">
            <div className="store-data-left">
              <div className="store-data-left-outline">
                <h1 className="store-data-left-name">{name}</h1>
                <div className="d-flex mt-4 ">
                  <p className="store-data-left-category">麵食</p>
                  <p className="store-data-left-star">評價的部分</p>
                  <div className="d-flex store-data-left-favorite">
                    <div className="store-data-left-icon">
                      <FaHeart />
                    </div>
                    <div className="store-data-left-favorite-num">33</div>
                  </div>
                </div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaMapMarkerAlt />
                </div>
                <div>{address}</div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaClock />
                </div>
                <div>周一至周六 08:00 - 21:00</div>
                <div className="d-flex store-data-left-content-business">
                  營業中
                </div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaPhoneAlt />
                </div>
                <div> 04-2326-0001</div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaExclamationCircle />
                </div>
                <div>店家介紹 : Lorem ipsum, dolor sit amet consectetur</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8 h-100">
            <div className="store-map">
              <p className="">google地圖</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
