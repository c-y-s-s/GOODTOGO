import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { FaExclamationCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { MAP_KEY } from "../../../key";
import GoogleMapReact from "google-map-react";
import { FiMapPin } from "react-icons/fi";
import MapPin from "./MapPin";

const StoreDetails = ({ storeId, storeData }) => {
  
  // 存店家所有評論資料
  const [storeCommentTotalData, setStoreCommentTotalData] = useState([]);
  // 店家經度
  const [storeMapDataLat, setStoreMapDataLat] = useState([]);
  // 店家緯度
   const [storeMapDataLng, setStoreMapDataLng] = useState([]);
  useEffect(() => {
    let getStoreDetalis = async () => {
      // 撈店家所有評論
      let storeCommentTotalResponse = await axios.get(
        `${API_URL}/storecommittotal/${storeId}`
      );
      // 撈店家經緯度
      let storeMapDataReaponse = await axios.get(
        `${API_URL}/storesmap/${storeId}`
      );
      setStoreCommentTotalData(storeCommentTotalResponse.data);
      setStoreMapDataLat(storeMapDataReaponse.data[0].longitude);
      setStoreMapDataLng(storeMapDataReaponse.data[0].latitude);
    };
    getStoreDetalis();
  }, []);

  // 地圖預設顯示地點
  const defaultProps = {
    center: {
      lat: storeMapDataLat,
      lng: storeMapDataLng,
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
        return (
          <div>
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
                      <h1 className="store-data-left-name">{item.name}</h1>
                      <div className="d-flex mt-4 a">
                        <div className="store-data-left-category mb-1">
                          {item.category}
                        </div>
                        <div className="store-data-left-star pb-2 d-flex ">
                          {/* // ? 評論星數無效 已解決*/}
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
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: "" }}
                      defaultCenter={defaultProps.center}
                      defaultZoom={defaultProps.zoom}
                    >
                      <MapPin
                        lat={storeMapDataLat}
                        lng={storeMapDataLng}
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
