import React from 'react';

let StoreCardID = 1011
const StoreCard = ({data}) => {
  return (
    <div>
      <div className="container">
        <div className="row cards">
          <div className="text-center text-md-end py-4">共 6 樣商品</div>
          {data.map((item) => {
                {
                  StoreCardID++;
                }
            return (
          
              <div
                className="col-12 col-md-6 col-lg-3 product-card "
                style={{ width: `18rem` }}
                key={StoreCardID}
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
                  <div className="card-body">
                    <div className="card-title">{item.name}</div>
                    <div className="card-star">評價的部分</div>
                    <div className="card-text">{item.description}</div>
                    <div className="text-end "> NT$ {item.price}</div>
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
