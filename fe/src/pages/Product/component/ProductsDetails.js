import { useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import axios from "axios";
import ProductsDetailsComment from "./ProductsDetailsComment";
import { UseGetData } from "../Hooks/Usedata";
// -------- React icon --------
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
// -------- MUI  Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// -------- 商品光箱 --------
import Swal from "sweetalert2";
import { useAuth } from "../../../context/auth";
const ProductsDetails = ({
  setOpenProductsModal,
  openProductsModaID,
  storeinOperation,
  openProductsModaltimeEnd,
  setisModalTouch,
}) => {
  const { storeId } = useParams();
  const { loginMember } = useAuth();

  // 指定 ID 商品評論
  const productModalCommentData = UseGetData(
    "productsdesignatecommit",
    openProductsModaID
  );
  // 指定 ID 商品 data
  const productModalData = UseGetData("product", openProductsModaID);
    console.log(productModalData)

  // 存錯誤訊息
  const [shoppingErrormsg, setshoopingErrormsg] = useState([]);

  //存購物車商品內容
  const [shoppingData, setShoppIngData] = useState({
    store_id: storeId,
    user_id: loginMember.id,
    products_id: openProductsModaID,
    amount: 1,
  });


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

  function handleCounter(condition) {
    if(condition === 'plus'){
        setBuyamount(buyamount + 1);
        setShoppIngData({ ...shoppingData, amount: buyamount + 1 });
        setshoopingErrormsg("");
    }else if(condition === 'minus'){
        setBuyamount(buyamount - 1);
        setShoppIngData({ ...shoppingData, amount: buyamount - 1 });
        setshoopingErrormsg("");
    }
  }
  function handleBackgroundDelete(e) {
    // e.target.id === "products-details-data" ?
    let backgroundId = e.target.id;
    // console.log(backgroundId);
    if (
      backgroundId === "products-details-data" ||
      backgroundId === "delete-button"
    ) {
      setOpenProductsModal(false);
      setisModalTouch(true);
    } else {
      setOpenProductsModal(true);
      setisModalTouch(false);
    }
  }
  async function handleAddShoppingCar(e) {
    e.preventDefault();
    //sweetalert 套件樣式
    Swal.fire({
      position: "center",
      icon: "success",
      title: "加入購物車成功",
      showConfirmButton: false,
      timer: 1500,
    });
    try {
      let response = await axios.post(
        `${API_URL}/shop/shoppingcar`,
        shoppingData
      );
      // console.log(response.data);
      setOpenProductsModal(false);
      setisModalTouch(true);
    } catch (e) {
      //印出錯誤物件
      // console.error(e.response)
      //把錯誤的data訊息放進自己做的errors模組裡後端傳出來的code號對應模組裡的訊息
      setshoopingErrormsg(ERR_MSG[e.response.data.code]);
    }
  }

  return (
    <div>
      <div className="black-background"></div>
      {/* -------- 商品資訊上半部分 -------- */}
      {productModalData.map((data) => {
        return (
          <div className="container products-details " key={data.id}>
            <div
              className="col-12 pt-2 products-details-data "
              id="products-details-data"
              onClick={handleBackgroundDelete}
            >
              <div className="card products-details-data-card mx-auto">
                <div className="">
                  <div className="product-logo">
                    <img
                      className=""
                      src={require(`../../../images/products_img/${data.img}`)}
                      id="product-top"
                      alt=""
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
                    <FiX id="delete-button" />
                  </button>
                  <div className="card-body py-3">
                    <h5 className="card-title">{data.name}</h5>
                    <div className="d-flex justify-content-between card-value align-items-center">
                      {/* 評價的地方 */}
                      {productstarTotal ? (
                        <div className="card-star d-flex">
                          <div>
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

                    <p className="card-text mb-0 fw-normal">
                      {data.description}
                    </p>
                    <div className=" card-text d-flex align-items-center fw-normal">
                      <div className="fialert-circle ">
                        <FiAlertCircle />
                      </div>
                      本商品不附帶免洗餐具
                    </div>
                    {/* // !這邊還沒測試有沒有bug */}
                    {openProductsModaltimeEnd <= 0 ? (
                      ""
                    ) : storeinOperation ? (
                      <div>
                        <div className="d-flex justify-content-between pt-4 fw-normal">
                          <div>合計金額</div>
                          <div className="">
                            <span className="pe-2">餐點剩餘</span>
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
                                onClick={()=>{
                                  handleCounter('minus')
                                }}
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
                              {buyamount > data.amount
                                ? data.amount
                                : buyamount}
                            </div>

                            {/* 加號 */}
                            {buyamount < data.amount ? (
                              <button
                                className=" buy-num-plus equation"
                                onClick={()=>{
                                    handleCounter("plus");
                                }}
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
                    <div className="product-buy-car my-1 text-center">
                      {openProductsModaltimeEnd <= 0 ? (
                        <div href="#" className="btn btn-primary close-buy-car">
                          無法提供
                        </div>
                      ) : data.amount <= 0 ? (
                        <div href="#" className="btn btn-primary close-buy-car">
                          無法提供
                        </div>
                      ) : storeinOperation ? (
                        <button
                          className="btn btn-primary"
                          id={`${data.id}`}
                          onClick={handleAddShoppingCar}
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
