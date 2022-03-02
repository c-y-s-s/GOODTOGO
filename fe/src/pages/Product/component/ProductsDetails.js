import { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import ProductsDetailsComment from "./ProductsDetailsComment";
import { ERR_MSG } from "../../../utils/error";
// -------- React icon --------
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
// -------- MUI  Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

// -------- 商品光箱 --------
const ProductsDetails = ({
  setOpenProductsModal,
  openProductsModaID,
  storeinOperation,
  openProductsModaltimeEnd,
  setisModalTouch,
}) => {
  const { storeId } = useParams();

  //  存指定 ID 商品的評論
  const [productModalCommentData, setProductModalCommentData] = useState([]);
  // 存指定 ID 的商品 data
  const [productModalData, setproductModalData] = useState([]);

  // 存錯誤訊息
  const [shoppingErrormsg, setshoopingErrormsg] = useState([]);
  console.log(shoppingErrormsg);
  //存購物車商品內容
  const [shoppingData, setShoppIngData] = useState({
    store_id: storeId,
    user_id: 1,
    products_id: openProductsModaID,
    amount: 1,
  });

  // const [productcar,setProductArr] = useState([])
  useLayoutEffect(() => {
    let getProductId = async () => {
      //撈指定 ID 商品的評論
      let productModalCommentResponse = await axios.get(
        `${API_URL}/productsdesignatecommit/${openProductsModaID}`
      );
      let productModalResponse = await axios.get(
        `${API_URL}/product/${openProductsModaID}`
      );
      setProductModalCommentData(productModalCommentResponse.data);
      setproductModalData(productModalResponse.data);
    };
    getProductId();
  }, [openProductsModaID]);

  // 計算指定商品的評論平均分數
  let productstarTotal = 0;
  productModalCommentData.forEach((item) => {
    productstarTotal += item.star;
  });
  let productstarTotalAVG = (
    productstarTotal / productModalCommentData.length
  ).toFixed(1);

  // 購買數量計數器
  const [buyamount, setBuyamount] = useState(1);
  function handlePlus(e) {
    setBuyamount(buyamount + 1);

    setShoppIngData({ ...shoppingData, amount: buyamount + 1 });
    setshoopingErrormsg("");
  }
  function handleMinus(e) {
    setBuyamount(buyamount - 1);

    setShoppIngData({ ...shoppingData, amount: buyamount - 1 });
    setshoopingErrormsg("");
  }

  async function handleAddShoppingCar(e) {
    e.preventDefault();
    try {
      let response = await axios.post(
        `${API_URL}/shop/shoppingcar`,
        shoppingData
      );
      console.log(response.data);
    } catch (e) {
      //印出錯誤物件
      // console.error(e.response)
      //把錯誤的data訊息放進自己做的errors模組裡後端傳出來的code號對應模組裡的訊息
      setshoopingErrormsg(ERR_MSG[e.response.data.code]);
    }
  }

  return (
    <div>
      <div
        className="black-background"
        onClick={() => setOpenProductsModal(false)}
      ></div>
      {/* -------- 商品資訊上半部分 -------- */}
      {productModalData.map((data) => {
        return (
          <div className="container products-details " key={data.id}>
            <div className="col-12 pt-4 products-details-data">
              <div className="card mx-auto" style={{ width: `22rem` }}>
                <div className="product-logo">
                  <img
                    className=""
                    src={require(`../../../images/products_img/${data.img}`)}
                    id="product-top"
                  />
                </div>
                {/* 關閉按鈕 */}
                <button
                  className="products-close"
                  onClick={() => {
                    setOpenProductsModal(false);
                    setisModalTouch(true);
                  }}
                >
                  <FiX />
                </button>
                <div className="card-body py-4">
                  <h5 className="card-title">{data.name}</h5>
                  <div className="d-flex justify-content-between card-value">
                    {/* 評價的地方 */}

                    {productstarTotal ? (
                      <div className="card-star d-flex">
                        <div>
                          {/* {console.log(productstarTotalAVG)} */}
                          <Stack spacing={2}>
                            <Rating
                              name="half-rating-read"
                              defaultValue={productstarTotalAVG}
                              precision={0.1}
                              readOnly
                            />
                          </Stack>
                        </div>
                        <div className="ms-2"> {productstarTotalAVG}</div>
                      </div>
                    ) : (
                      <div>商品還沒有評價呦</div>
                    )}

                    <div className="card-price">NT$ {data.price}</div>
                  </div>
                  <p className="card-text mb-0">{data.description}</p>
                  <div className=" card-text d-flex align-items-center">
                    <div className="fialert-circle">
                      <FiAlertCircle />
                    </div>
                    本商品不附帶免洗餐具
                  </div>
                  {/* // !這邊還沒測試有沒有bug */}
                  {openProductsModaltimeEnd <= 0 ? (
                    ""
                  ) : storeinOperation ? (
                    <div>
                      <div className="d-flex justify-content-between pt-4">
                        <div>合計金額</div>
                        <div>
                          餐點剩餘
                          {storeinOperation === false ? 0 : data.amount}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between card-amount">
                        <div className="card-total-price ">
                          NT $ {buyamount * data.price}
                        </div>
                        <div className="d-flex buy-num">
                          {/* 減號 */}
                          {buyamount > 1 ? (
                            <button
                              className=" buy-num-minus equation"
                              onClick={handleMinus}
                              id={`${data.id}`}
                            >
                              <FiMinusCircle />
                            </button>
                          ) : (
                            <button className=" buy-num-minus equation opacity-0">
                              <FiMinusCircle />
                            </button>
                          )}

                          <div className=" buy-num-num ">
                            {buyamount > data.amount ? data.amount : buyamount}
                          </div>

                          {/* 加號 */}
                          {buyamount < data.amount ? (
                            <button
                              className=" buy-num-plus equation"
                              onClick={handlePlus}
                              id={`${data.id}`}
                            >
                              <FiPlusCircle />
                            </button>
                          ) : (
                            <button className=" buy-num-plus equation opacity-0">
                              <FiPlusCircle />
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}

                  {/* // !這邊還沒測試有沒有bug */}
                  <div className="product-buy-car my-3 text-center">
                    {openProductsModaltimeEnd <= 0 ? (
                      <div href="#" className="btn btn-primary close-buy-car">
                        無法提供
                      </div>
                    ) : storeinOperation ? (
                      <button
                        className="btn btn-primary"
                        id={`${data.id}`}
                        onClick={
                          handleAddShoppingCar
                          // productarr.push(data);
                          // console.log(productarr);
                          // let products = JSON.stringify(data);
                          // console.log(products);
                          // alert("加入購物車成功");
                          // localStorage.setItem("proaaducts", products);
                        }
                      >
                        加入購物車
                      </button>
                    ) : (
                      <div href="#" className="btn btn-primary close-buy-car">
                        無法提供
                      </div>
                    )}
                  </div>
                </div>
                {/* -------- 商品資訊上半部分結束 -------- */}

                {/* 裝飾條 */}
                <div className="decorative "></div>
                {/* --------- 評論區塊 --------*/}
                <ProductsDetailsComment
                  productModalCommentData={productModalCommentData}
                />
                {/* --------- 評論區塊結束--------*/}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsDetails;
