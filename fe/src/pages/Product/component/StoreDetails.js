import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { UseGetStoreData ,UseGetData} from "../Hooks/Usedata";
// -------- React Icon --------
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { MAP_KEY } from "../../../key";
// -------- MUI Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// -------- google map -------
// import { MAP_KEY } from "../../../key";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
// -------- Moment plugin --------
import moment from "moment";
import "moment/min/locales";

const StoreDetails = ({
  storeId,
  storeData,
  setStoreInOperation,
  setStoreTodayClose,
  storeTodayClose,
}) => {
  //設定 moment 時區
  moment.locale("zh-tw");
  let timeInsecond = moment().format("LTS");
  // 現在秒數必須大於開店秒數而且小於關店秒數才是營業中
  // 目前時間總秒數
  let timeInsecondResult =
    parseInt(timeInsecond[0] + timeInsecond[1]) * 60 * 60 +
    parseInt(timeInsecond[3] + timeInsecond[4]) * 60 +
    parseInt(parseInt(timeInsecond[6] + timeInsecond[7]));


  // 存店家所有評論資料
  const storeCommentTotalData = UseGetData("storecommittotal", storeId);
  // 經緯度、評論總數
  const storeMapLikeData = UseGetStoreData(storeId);

  // 地圖預設顯示地點
  const defaultProps = {
    center: {
      lat: storeMapLikeData.longitude,
      
      lng: storeMapLikeData.latitude,
    },
    zoom: 17,
  };

  // 計算店家評價總分
  let storeStarTotal = 0;
  // 評論總筆數
  let storeStarCount = 0;
  storeCommentTotalData.forEach((item) => {
    storeStarTotal += item.star;
    storeStarCount++;
  });
  // 店家評價總分除總筆數
  let storeStarAVG = (storeStarTotal / storeStarCount).toFixed(1);

  return (
    <div>
      {storeData.map((item) => {
        //判斷今天店家有沒有休息
        let closeworkDay = JSON.parse(item.close_day);
        closeworkDay.forEach((item) => {
          if (new Date().getDay() === item) {
            setStoreTodayClose(true);
          }
        });
        let closeDayData = JSON.parse(item.close_day);
        let closeDayChinese = [];
        closeDayData.forEach((item) => {
          if (item === 1) closeDayChinese.push("一");
          if (item === 2) closeDayChinese.push("二");
          if (item === 3) closeDayChinese.push("三");
          if (item === 4) closeDayChinese.push("四");
          if (item === 5) closeDayChinese.push("五");
          if (item === 6) closeDayChinese.push("六");
          if (item === 0) closeDayChinese.push("日");
        });
        /* // 休息日調整格式 */
        let closeday = closeDayChinese.join("、");
        /* 電話號碼加上- */
        let newTelNo = item.tel_no.replace(/(.{2})/, "$1-");

        /* 營業時間秒數 */

        let storeOpenTimeSecond =
          parseInt(item.open_time[0] + item.open_time[1]) * 60 * 60 +
          parseInt(item.open_time[3] + item.open_time[4]) * 60 +
          parseInt(item.open_time[6] + item.open_time[7]);

        /* 關店時間秒數 */

        let storeCloseTimeSecond =
          parseInt(item.close_time[0] + item.close_time[1]) * 60 * 60 +
          parseInt(item.close_time[3] + item.close_time[4]) * 60 +
          parseInt(item.close_time[6] + item.close_time[7]);

        /*  判斷營業中或是非營業中 */

        let inOperation = "";
        if (
          timeInsecondResult > storeOpenTimeSecond &&
          timeInsecondResult < storeCloseTimeSecond
        ) {
          inOperation = true;
          setStoreInOperation(true);
        } else {
          inOperation = false;
          setStoreInOperation(false);
        }

        return (
          <div key={uuidv4()}>
            <div>
              <div className="container-fluid p-0">
                <div className="storeLogo">
                  <img
                    className="w-100 storeLogoImg"
                    src={require(`../../../images/store_img/${item.logo}`)}
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="container store-data">
              <div className="row">
                <div className="col-12 col-md-6 col-lg-4 pe-lg-3">
                  <div className="store-data-left">
                    <div className="store-data-left-outline py-1">
                      <div className="d-flex">
                        <h1 className="store-data-left-name">{item.name}</h1>
                        <div>
                          {storeTodayClose ? (
                            <div className="d-flex store-data-left-content-close ">
                              休息中
                            </div>
                          ) : inOperation ? (
                            <div className="d-flex store-data-left-content-open">
                              營業中
                            </div>
                          ) : (
                            <div className="d-flex store-data-left-content-close">
                              休息中
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex mt-4 align-items-center">
                        <div className="store-data-left-category ">
                          {item.category}
                        </div>
                        <div className="store-data-left-star  d-flex ">
                          <Stack spacing={1}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={storeStarAVG}
                              precision={0.1}
                              readOnly
                            />
                          </Stack>

                          <div className="ps-2">{storeStarAVG}</div>
                          <div className="ps-2">({storeStarCount})</div>
                        </div>
                        <div className="d-flex store-data-left-favorite pb-1">
                          <div className="store-data-left-icon ">
                            <FaHeart className="pb-1" />
                          </div>
                          <div className="store-data-left-favorite-num">
                            {storeMapLikeData.storeLikeTotal}
                          </div>
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
                      <div className="d-flex workday">
                        <div>星期 {closeday} 公休</div>
                        <div className="work-time">
                          {moment(item.open_time, "hh:mm:ss").format("LT")}-
                          {moment(item.close_time, "hh:mm:ss").format("LT")}
                        </div>
                      </div>
                    </div>

                    <div className="d-flex store-data-left-content">
                      <div className="store-data-icon">
                        <FaPhoneAlt />
                      </div>
                      <div>{newTelNo}</div>
                    </div>

                    <div className="d-flex store-data-left-content">
                      {/* <div className="store-data-icon">
                        <FaExclamationCircle />
                      </div> */}
                      {/* <div>店家介紹 : 這欄考慮拿掉</div> */}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 col-lg-8 h-100">
                  <div className="store-map">
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: MAP_KEY,
                      }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      <MapPin
                        lat={storeMapLikeData.longitude}
                        lng={storeMapLikeData.latitude}
                        text={item.address}
                      />
                    </GoogleMapReact>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StoreDetails;
