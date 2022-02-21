import React from "react";

const Card = () => {
  return (
    <div>
      <div className="row py-5 px-3 row-390">
        <div className="col">
          <div className="time-title">2022-02-01</div>
          <img
            src={require(`../images/coupon5.png`)}
            alt="..."
            className="coupon-images"
          />
          {/* <div className="time-title d-flex justify-content-center aaa">
            剩餘數量：99
          </div> */}
          <h6 class="number-title">
            <span> 剩餘數量：99</span>
          </h6>
        </div>
        <div className="col">
          <div className="time-title">2022-02-01</div>
          <img
            src={require(`../images/coupon20.png`)}
            alt="..."
            className="coupon-images"
          />
          <h6 class="number-title">
            <span> 剩餘數量：99</span>
          </h6>
        </div>
        <div className="col">
          <div className="time-title">2022-02-01</div>
          <img
            src={require(`../images/coupon30.png`)}
            alt="..."
            className="coupon-images"
          />
          <h6 class="number-title">
            <span> 剩餘數量：99</span>
          </h6>
        </div>
      </div>
      <div className="row py-5 px-3 row-390">
        <div className="col">
          <div className="time-title">2022-02-01</div>
          <img
            src={require(`../images/coupon40.png`)}
            alt="..."
            className="coupon-images"
          />
          <h6 class="number-title">
            <span> 剩餘數量：99</span>
          </h6>
        </div>
        <div className="col">
          <div className="time-title">2022-02-01</div>
          <img
            src={require(`../images/coupon60.png`)}
            alt="..."
            className="coupon-images"
          />
          <h6 class="number-title">
            <span> 剩餘數量：99</span>
          </h6>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Card;
