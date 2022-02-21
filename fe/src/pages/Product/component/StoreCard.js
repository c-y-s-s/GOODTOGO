import { useState, useEffect, useLayoutEffect } from "react";
import ProductsDetails from "./ProductsDetails";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Countdown, {
  zeroPad,
  calcTimeDelta,
  formatTimeDelta,
} from "react-countdown";
import moment from "moment";
import "moment/min/locales";
const StoreCard = ({ data }) => {

moment.locale("zh-tw");


  // 光箱啟動、關閉
  const [openProductsModal, setOpenProductsModal] = useState(false);
  // 撈出按下商品卡片的 ID
  const [openProductsModaID, setOpenProductsModalID] = useState(0);



  const Completionist = () => <span>You are good to go!</span>;
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
            console.log(parseInt(item.due_time)*60*60)    
            console.log(parseInt(new Date().getTime() / 1000)); 
            let startime = parseInt(item.due_time) * 60 * 60;      
            return (
              <div
                className="col-12 col-md-6 col-lg-3 product-card "
                style={{ width: `18rem` }}
                key={item.id}
                onClick={() => {
                  setOpenProductsModalID(item.id);
                  setOpenProductsModal(true);
                }}
              >
                <div className="card m-0 ">
                  <div className="d-flex product-card-text">
                    <div className="time-text">
                      時間倒數
                      <span>
                        <Countdown
                          date={Date.now() + startime*100}
                          zeroPadTime={2}
                          renderer={renderer}
                        />
                      </span>
                
                    </div>
                    <div className="amount-text">剩餘{item.amount}</div>
                  </div>
                  <div className="product-img ratio ratio-4x3 ">
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
          />
        </div>
      )}
    </div>
  );
};;

export default StoreCard;
