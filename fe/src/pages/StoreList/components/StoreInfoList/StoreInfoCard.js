import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import { AiOutlineClockCircle } from "react-icons/ai";
import { v4 as uuidv4 } from "uuid";
import "moment/min/locales";
const moment = require("moment");

const StoreInfoCard = (props) => {
  moment.locale("zh-tw");
  const { storeList, storeLikeCount } = props;
  return (
    <>
      {storeList.map((item) => {
        //--------處理資料庫的時間格式--------
        let openTime = moment(item.open_time, "hh:mm:ss.000").format("hh:mm");
        let closeTime = moment(item.close_time, "hh:mm:ss.000").format("HH:mm");
        //-------- 判斷目前是否營業中 --------
        //TODO 判斷時間
        //?let nowTime = Number(moment().format("HHmm")); // number 1830
        //*開發中的假時間
        let nowTime = 2131;
        let checkOpenTime = Number(
          moment(item.open_time, "hh:mm:ss.000").format("hhmm")
        );
        let checkCloseTime = Number(
          moment(item.close_time, "hh:mm:ss.000").format("HHmm")
        );
        //TODO 判斷星期幾，如果closeDay裡面有今天就是休息
        //?let today = Number(moment().format("d")); //5
        //*開發中的假時間
        let today = 5;
        let closeDay = JSON.parse(item.close_day); //[3,5]
        if (closeDay.includes(today)) {
          console.log("hhh");
        }
        // -------- 處理沒有分店名的空白欄位 --------
        let space = "";
        {
          /* console.log(item.name); */
        }
        for (let i = 1; i < item.name.length; i++) {
          {
            /* console.log(item.name[i]); */
          }
          item.name[i] === " " && (space = true);
        }
        {
          /* console.log(space); */
        }
        // -------- 處理評分星星 --------

        return (
          <div key={uuidv4()}>
            <Link to={`all/${item.id}`} className="no-link">
              <div className="store-info-card shadow d-flex align-items-center">
                <div className="info-img col-12">
                  <img
                    src={require(`../../../../images/store_img/${item.logo}`)}
                    alt="logo"
                  />
                  {/* //*判斷休息中：現在時間 早於 openHour || 晚於closeHour */}
                  <div
                    className={`${
                      nowTime < checkOpenTime ||
                      nowTime > checkCloseTime ||
                      closeDay.includes(today)
                        ? "is-closed"
                        : "is-open"
                    }`}
                  >
                    {nowTime < checkOpenTime ||
                    nowTime > checkCloseTime ||
                    closeDay.includes(today)
                      ? "休息中"
                      : "營業中"}
                  </div>
                </div>
                <div className="info-title mt-3 d-flex justify-content-between col-12">
                  <span className="text-dark-grey input-label-title">
                    {item.name.split(" ")[0]}
                    <br />
                    <span className="text-dark-grey detail-sm">
                      {space === true ? item.name.split(" ")[1] : <div />}
                      {/* 開發中才開啟 */}
                      {item.close_day}
                      {/* 實際不會用到 */}
                    </span>
                  </span>

                  <div className="cate-tag">{item.category}</div>
                </div>
                <div className="info-detail col-12 text-dark-grey detail-sm d-flex align-items-center justify-content-between flex-wrap mt-2">
                  <div>
                    <AiOutlineClockCircle className="mb-1" /> {openTime} -
                    {closeTime}
                  </div>
                  <span className="text-dark-grey">剩餘餐點：14</span>
                  <hr className="col-12 mt-2 mb-2" />
                  <Rating name="read-only" value={1} readOnly />
                  {/* <span>Rating</span> */}

                  <span> heart </span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};

export default StoreInfoCard;
