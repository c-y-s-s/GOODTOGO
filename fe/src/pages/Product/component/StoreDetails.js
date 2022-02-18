import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const StoreDetails = ({ item, storeStarTotal }) => {

 
  return (
    <div>
      <div className="container store-data">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 pe-lg-3">
            <div className="store-data-left">
              <div className="store-data-left-outline">
                <h1 className="store-data-left-name">{item.name}</h1>
                <div className="d-flex mt-4 ">
                  <p className="store-data-left-category ">{item.category}</p>
                  <p className="store-data-left-star">{storeStarTotal}</p>
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
                <div>{item.address}</div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaClock />
                </div>
                <div>
                  星期 {JSON.parse(item.close_day)} 公休
                  <div>
                    {item.open_time} - {item.close_time}{" "}
                  </div>
                </div>

                <div className="d-flex store-data-left-content-business">
                  營業中
                </div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaPhoneAlt />
                </div>
                <div>{item.tel_no}</div>
              </div>

              <div className="d-flex store-data-left-content">
                <div className="store-data-icon">
                  <FaExclamationCircle />
                </div>
                <div>店家介紹 : 這欄考慮拿掉</div>
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
