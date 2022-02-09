import React from 'react';

const StoreCard = ({data}) => {
  return (
    <div>
      <div class="container">
        <div className="row cards">
          <div className="text-center text-md-end py-4">共 6 樣商品</div>
          {data.map((item) => {
            return (
              <div
                className="col-12 col-md-6 col-lg-3 product-card "
                style={{ width: `18rem` }}
              >
                <div class="card m-0 ">
                  <div class="d-flex product-card-text">
                    <div class="time-text">
                      時間倒數<span>02:56:33</span>
                    </div>
                    <div class="amount-text">剩餘{item.amount}</div>
                  </div>
                  <div class="product-img ratio ratio-4x3 ">
                    <img
                      class=" cover-fit"
                      src={require(`../../../images/products_img/${item.img}`)}
                      alt="商品"
                    />
                  </div>
                  <div class="card-body">
                    <div class="card-title">{item.name}</div>
                    <div class="card-star">評價的部分</div>
                    <div class="card-text">{item.description}</div>
                    <div class="text-end "> NT$ {item.price}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreCard;
