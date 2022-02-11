import React from 'react';

const ProductsDetails = () => {
  return (
    <div>
      <div className="container products-details">
        <div className="col-12 mt-5 products-details-data">
          <div className="card mx-auto" style={{ width: `25rem` }}>
            <img src={require(`../../../images/store_img/01.jpg`)} alt="" />
            <div className="card-body py-4">
              <h5 className="card-title">鴨肉蓋飯</h5>
              <div className="d-flex justify-content-between card-value">
                <div className="card-star">星星</div>
                <div className="card-price">NT$ 60</div>
              </div>
              <p className="card-text mb-0">
                使用特選鴨肉及米飯，吃得出師傅的好手藝及食材本身的美味
              </p>
              <p className=" card-text">本商品不附帶免洗餐具</p>
              <div>
                <div className="d-flex justify-content-between">
                  <div>合計金額</div>
                  <div>餐點剩餘 0</div>
                </div>

                <div className="d-flex justify-content-between card-amount">
                  <div className="card-total-price ">NT $ 240</div>
                  <div className="d-flex buy-num">
                    <button className="btn buy-num-minus equation">-</button>

                    <div className=" buy-num-num ">4</div>
                    <button className="btn buy-num-plus equation">+</button>
                  </div>
                </div>
              </div>
              <div className="product-buy-car my-3 text-center">
                <a href="#" className="btn btn-primary   ">
                  加入購物車
                </a>
              </div>
            </div>
            {/* 裝飾條 */}
            <div className="decorative "></div>
            {/* 評論區塊阿~~~ */}
            <div class="product-users-commit">
              <div className="commit-filter d-flex justify-content-between mt-4">
                <div className="d-flex">
                  <div className="me-2">評分</div>
                  <div>留言時間</div>
                </div>
                <div>共 6 則評論</div>
              </div>
              <div className="d-flex mt-3 product-users-commit-data mt-4">
                <div className="product-users-commit-photo ratio ratio-4x3">
                  <img
                    className=" img-fluid  cover-photo"
                    src={require(`../images/pexels-charles-1851164.jpg`)}
                    alt=""
                  />
                </div>

                <div className="ms-3 product-users-commit-userdata">
                  <div className="d-flex justify-content-between">
                    <div className="product-users-commit-userdata-name">
                      王曉明
                    </div>
                    <div className="d-flex product-users-commit-userdata-time">
                      <div>2022-2-10 10:10 PM</div>
                      <div>:</div>
                    </div>
                  </div>

                  <div className="product-users-commit-userdata-star">星星</div>
                  <div className="product-users-commit-userdata-text">
                    太鹹了拔
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
