import { useState, useEffect, useLayoutEffect } from "react";
import { FiMinusCircle } from "react-icons/fi";
import { FiPlusCircle } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiX } from "react-icons/fi";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import ProductsDetailsCommit from "./ProductsDetailsCommit";
// -------- 商品光箱 --------
const ProductsDetails = ({
  setOpenProductsModal,
  productModalData,
  openProductsModaID,
}) => {
  const [productModalCommitData, setProductModalCommitData] = useState([]);
  //算商品評論數字 全部評價相加 除 筆數 取小數點後一位
  const [productStarTotal, setProductStarTotal] = useState(0);


  //撈指定 商品 ID 的 評論
  useLayoutEffect(() => {
    let getProductId = async () => {
      let productModalCommitResponse = await axios.get(
        `${API_URL}/productsdesignatecommit/${openProductsModaID}`
      );

      setProductModalCommitData(productModalCommitResponse.data);
    };
    getProductId();
  }, [openProductsModaID]);


  //計算指定商品的評論平均分數
  // console.log("算評價total的地方", productModalCommitData);
  let productstarTotal = 0;
  productModalCommitData.forEach((item) => {
    productstarTotal += item.star;
  });
  let productstarTotalAVG = (
    productstarTotal / productModalCommitData.length
  ).toFixed(1);

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
                  />
                </div>
                {/* 關閉按鈕 */}
                <button
                  className="products-close"
                  onClick={() => setOpenProductsModal(false)}
                >
                  <FiX />
                </button>
                <div className="card-body py-4">
                  <h5 className="card-title">{data.name}</h5>
                  <div className="d-flex justify-content-between card-value">
                    {/* TODO: 已撈到全部評論相加除筆數 */}
                    {productstarTotal ? (
                      <div className="card-star">{productstarTotalAVG}</div>
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
                  <div>
                    <div className="d-flex justify-content-between pt-4">
                      <div>合計金額</div>
                      <div>餐點剩餘 {data.amount}</div>
                    </div>

                    <div className="d-flex justify-content-between card-amount">
                      <div className="card-total-price ">NT $ 0</div>
                      <div className="d-flex buy-num">
                        {/* 減號 */}
                        <button className=" buy-num-minus equation">
                          <FiMinusCircle />
                        </button>
                        <div className=" buy-num-num ">0</div>
                        {/* 加號 */}
                        <button className=" buy-num-plus equation">
                          <FiPlusCircle />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-buy-car my-3 text-center">
                    <a href="#" className="btn btn-primary   ">
                      加入購物車
                    </a>
                  </div>
                </div>
                {/* -------- 商品資訊上半部分結束 -------- */}

                {/* 裝飾條 */}
                <div className="decorative "></div>
                {/* --------- 評論區塊 --------*/}
                <ProductsDetailsCommit
                  productModalCommitData={productModalCommitData}
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
