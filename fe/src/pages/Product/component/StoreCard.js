import { useState, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../utils/config";
import axios from "axios";
import ProductsDetails from "./ProductsDetails";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const StoreCard = ({ data }) => {
  // 光箱啟動、關閉
  const [openProductsModal, setOpenProductsModal] = useState(false);
  // 撈出按下商品卡片的 ID
  const [openProductsModaID, setOpenProductsModalID] = useState(0);

  // 存入商品詳細內容評論總比數
  // 取詳細頁面裡面的總評價出來渲染
  // const [touchProductAVG,settouchProductAVG] = useState(0)

  return (
    <div>
      <div className="container">
        <div className="row cards">
          <div className="text-center text-md-end py-4">共 6 樣商品</div>

          {data.map((item) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-3 product-card "
                style={{ width: `18rem` }}
                key={item.id}
                onClick={() => {
                  setOpenProductsModalID(item.id);
                  console.log("點商品card取到的id", item.id);
                  setOpenProductsModal(true);
                }}
              >
                <div className="card m-0 ">
                  <div className="d-flex product-card-text">
                    <div className="time-text">
                      時間倒數<span>02:56:33</span>
                    </div>
                    <div className="amount-text">剩餘{item.amount}</div>
                  </div>
                  <div className="product-img ratio ratio-4x3 ">
                    <img
                      className=" cover-fit"
                      src={require(`../../../images/products_img/${item.img}`)}
                      alt="商品"
                    />
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
};

export default StoreCard;
