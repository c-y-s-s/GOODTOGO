import React from 'react';

const StoreDetails = ({name,address,tel_no,}) => {
  return (
    <div>
      <div class="container store-data">
        <div class="row">
          <div className="col-12 col-md-6 col-lg-4">
            <div class="storeDataLeft">
              <h1>{name}</h1>
              <div class="d-flex">
                <p>分類</p>
                <p>星星</p>
                <p>愛心</p>
              </div>
              <p>{address}</p>
              <div>
                <p>營業日</p>
                <p>顯示營業中非營業中</p>
              </div>
              <p>{tel_no}</p>
              <p>店家介紹 : Lorem ipsum, dolor sit amet consectetur</p>
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-8 h-100">
            <div class="store-map">
              <p class="">google地圖</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDetails;
