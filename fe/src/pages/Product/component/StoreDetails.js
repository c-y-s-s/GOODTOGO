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
const StoreDetails = ({ item, storeId }) => {
  // 存商家資料
  const [storeData, setStoreData] = useState([]);
  // 存店家所有評論資料
  const [storeCommitTotalData, setStoreCommitTotalData] = useState([]);

  useEffect(() => {
    let getStoreCommit = async () => {
      // 撈符合店家 id 資料
      let storeResponse = await axios.get(`${API_URL}/stores/${storeId}`);
      // 撈店家所有評論
      let storeCommitTotalResponse = await axios.get(
        `${API_URL}/storecommittotal/${storeId}`
      );
      setStoreData(storeResponse.data);
      setStoreCommitTotalData(storeCommitTotalResponse.data);
    };
    getStoreCommit();
  }, []);

  // 計算店家評價總分
  let storeStarTotal = 0;
  let storeStarCount = 0;
  storeCommitTotalData.forEach((item) => {
    storeStarTotal += item.star;
    storeStarCount++;
  });
  // 店家評價總分除總筆數
  let storeStarAVG = (storeStarTotal / storeStarCount).toFixed(1);

  return (
    <div>
      <div className="container store-data">
        <div className="row">
          <div className="col-12 col-md-6 col-lg-4 pe-lg-3">
            <div className="store-data-left">
              <div className="store-data-left-outline">
                <h1 className="store-data-left-name">{item.name}</h1>
                <div className="d-flex mt-4 a">
                  <div className="store-data-left-category mb-1">
                    {item.category}
                  </div>
                  <div className="store-data-left-star pb-2 d-flex ">
                    {/* // ! 評論星數無效?? */}

                    <Stack spacing={1}>
                      <Rating
                        name="half-rating-read"
                        defaultValue={isNaN(storeStarAVG) ? 0 : storeStarAVG}
                        precision={0.1}
                        readOnly
                      />
                      {console.log(isNaN(storeStarAVG), storeStarAVG)}
                    </Stack>
                    <div className="ms-3">{storeStarAVG}</div>
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
              <p className="">google地圖</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
