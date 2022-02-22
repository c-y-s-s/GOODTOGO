import { useState, useEffect, useLayoutEffect } from "react";
import ProductsDetails from "./ProductsDetails";

// -------- MUI  Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// -------- 倒數計時套件 --------
import Countdown, { zeroPad } from "react-countdown";
// -------- Moment plugin --------
import moment from "moment";
import "moment/min/locales";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
const StoreCard = ({ data, storeinOperation }) => {
  moment.locale("zh-tw");
  // !計算當前時間秒數 hh:mm:ss
  let timeInsecond = moment().format("LTS");

  //!目前時間總秒數
  let timeInsecondResult =
    parseInt(timeInsecond[0] + timeInsecond[1]) * 60 * 60 +
    parseInt(timeInsecond[3] + timeInsecond[4]) * 60 +
    parseInt(parseInt(timeInsecond[6] + timeInsecond[7]));

  // 光箱啟動、關閉
  const [openProductsModal, setOpenProductsModal] = useState(false);
  // 撈出按下商品卡片的 ID
  const [openProductsModaID, setOpenProductsModalID] = useState(0);

  const [productTimeEnd , setProductTimeEnd] = useState(0)
  // 倒數套件樣式
  const Completionist = () => <span>結束販售</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          {zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
        </span>
      );
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row cards">
          <div className="text-center text-md-end py-4">共 6 樣商品</div>

          {data.map((item) => {
            //! 商品開始販售時間
            let itemTimeProductOpenSecond =
              parseInt(item.start_time[0] + item.start_time[1]) * 60 * 60 +
              parseInt(item.start_time[3] + item.start_time[4]) * 60 +
              parseInt(item.start_time[6] + item.start_time[7]);
            //! 商品結束販售時間
            let itemTimeProductCloseSecond =
              parseInt(item.due_time[0] + item.due_time[1]) * 60 * 60 +
              parseInt(item.due_time[3] + item.due_time[4]) * 60 +
              parseInt(item.due_time[6] + item.due_time[7]);
            // ! 商品結束販售時間 - 現在時間
            let timeEnd = itemTimeProductCloseSecond - timeInsecondResult;
            //! 店家休息 false 就不倒數
            storeinOperation
              ? (timeEnd = itemTimeProductCloseSecond - timeInsecondResult)
              : (timeEnd = 0);

            //! 現在時間秒數要大於開始販售時間才是開始販售
            timeInsecondResult > itemTimeProductOpenSecond
              ? (timeEnd = itemTimeProductCloseSecond - timeInsecondResult)
              : (timeEnd = 0);

            return (
              <div
                className="col-12 col-md-6 col-lg-3 product-card "
                style={{ width: `18rem` }}
                key={uuidv4()}
                onClick={() => {
                  setOpenProductsModalID(item.id);
                  setOpenProductsModal(true);
                }}
              >
                <div className="card m-0 ">
                  <div className="d-flex product-card-text">
                    <div className="time-text">
                      時間倒數
                      <span
                        className={`${timeEnd < 3600 && "count-down-one-hour"}`}
                      >
                        <Countdown
                          date={Date.now() + timeEnd * 1000}
                          zeroPadTime={2}
                          renderer={renderer}
                        />
                      </span>
                    </div>
                    <div className="amount-text">
                      剩餘
                      {storeinOperation === false
                        ? 0
                        : timeEnd === 0
                        ? 0
                        : item.amount}
                    </div>
                  </div>
                  <div
                    className={`product-img ratio ratio-4x3 ${
                      storeinOperation === false
                        ? "close-active"
                        : timeEnd === 0 && "close-active"
                    }`}
                  >
                    <img
                      className=" cover-fit"
                      src={require(`../../../images/products_img/${item.img}`)}
                      alt="商品"
                    />
                    {/* //!  資料庫時間 - 目前時間 得出秒數 + 上去套件倒數 */}
                  </div>
                  <div className="card-body ">
                    <div className="">
                      <div className="card-title">{item.name}</div>
                      <div className="card-star ">
                        {item.score > 0 ? (
                          <div className="d-flex">
                            <div>
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={item.score}
                                  precision={0.1}
                                  readOnly
                                />
                              </Stack>
                            </div>

                            <div className="ms-2">{item.score}</div>
                          </div>
                        ) : (
                          "商品沒有評價"
                        )}
                      </div>
                      <div className="card-text pt-2">{item.description}</div>
                    </div>

                    <div className="text-end "> NT$ {item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {openProductsModal && (
        <div>
          <ProductsDetails
            setOpenProductsModal={setOpenProductsModal}
            // productModalData={productModalData}
            openProductsModaID={openProductsModaID}
            storeinOperation={storeinOperation}

          />
        </div>
      )}
    </div>
  );
};

export default StoreCard;
