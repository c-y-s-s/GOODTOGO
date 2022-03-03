import { useState, useEffect, useLayoutEffect } from "react";
import ProductsDetails from "./ProductsDetails";
import axios from "axios";
import { API_URL } from "../../../utils/config";
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
const StoreCard = ({
  storeId,
  storeinOperation,
  storeDayClose,
  setisModalTouch,
}) => {
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
  // 存商品是否已結束販售
  const [openProductsModaltimeEnd, setopenProductsModaltimeEnd] = useState(0);
  // 存商家商品
  const [productsdata, setProducts] = useState([]);

  // ? 倒數計時及時開關
  const [countdownTimeUp, setCountdownTimeUp] = useState("");

  // 第二層
  useEffect(() => {
    let getProducts = async () => {
      let productsResponse = await axios.get(`${API_URL}/products/${storeId}`);
      setProducts(productsResponse.data);
    };
    getProducts();
  }, [countdownTimeUp]);

  // ? 時間到執行這個元件
  const Completionist = () => {
    return <span>結束販售</span>;
  };


  // ! 卡片跳動bug尚未解決
  // ? 時間倒數套件
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a Completionist complete
      // ? 商品結束販售給開關true
      setCountdownTimeUp(completed);
      return <Completionist />;
    } else {
      //  Render 倒數時間
      // ? 商品倒數中給 false 但是會一直重複跑導致往頁很慢
      setCountdownTimeUp(completed);
      setCountdownTimeUp(completed);
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
        <div className="row cards ">
          <div className="text-center text-md-end py-4">共 6 樣商品</div>

          {productsdata.map((item) => {
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

            // ! 店家休息 false 就不倒數
            // ! 如果日期是休息日
            // ! timeEnd = 0
            // ! 如果
            {
              /* storeinOperation
              ? (timeEnd = itemTimeProductCloseSecond - timeInsecondResult)
              : (timeEnd = 0); */
            }
            //營業日TRUE等於沒開
            storeDayClose
              ? (timeEnd = 0)
              : storeinOperation
              ? (timeEnd = itemTimeProductCloseSecond - timeInsecondResult)
              : (timeEnd = 0);

            //! 現在時間秒數要大於開始販售時間才是開始販售
            timeInsecondResult > itemTimeProductOpenSecond
              ? (timeEnd = itemTimeProductCloseSecond - timeInsecondResult)
              : (timeEnd = 0);

            return (
              <div
                className="col-12 col-md-6 col-lg-3 product-card"
                style={{ width: `15.9rem` }}
                key={uuidv4()}
                onClick={() => {
                  setOpenProductsModalID(item.id);
                  setOpenProductsModal(true);
                  setopenProductsModaltimeEnd(timeEnd);
                  setisModalTouch(false);
                }}
              >
                <div className="card m-0 px-2">
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
                      {/* {storeinOperation === false
                        ? 0
                        : timeEnd <= 0
                        ? 0
                        : item.amount} */}
                      {storeDayClose
                        ? 0
                        : storeinOperation === false
                        ? 0
                        : timeEnd <= 0
                        ? 0
                        : item.amount}
                    </div>
                  </div>
                  <div
                    className={`product-img ratio ratio-4x3 ${
                      storeDayClose
                        ? "close-active"
                        : storeinOperation === false
                        ? "close-active"
                        : timeEnd <= 0 && "close-active"
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
                    <div className="px-2">
                      <div className="card-title">{item.name}</div>
                      <div className="card-star ">
                        {item.score > 0 ? (
                          <div className="d-flex">
                            <div className="fs-1">
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  classNmae=""
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
                      <div className="card-text">{item.description}</div>
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
            openProductsModaltimeEnd={openProductsModaltimeEnd}
            setisModalTouch={setisModalTouch}
          />
        </div>
      )}
    </div>
  );
};

export default StoreCard;
