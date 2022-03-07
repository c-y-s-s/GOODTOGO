import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";

const Card = () => {
  return (
    <div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require(`../images/LatestNews.png`)}
              alt="..."
              className="card-images"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body ">
              <h5 className="card-title">
                【優惠活動】慶祝迎接新年，最新優惠活動
              </h5>
              <p className="card-text">
                <AiOutlineClockCircle className="icons-size me-2" />
                2021.12.15
              </p>
              <p className="card-text">
                迎接虎年，謝謝 2021
                年各位的支持，特別感恩回饋，發送喜迎新年優惠券，讓大家新年呷虎飽飽！使用
                期限至 2022.03.31 止，數量有限，送完為止～<span className="text-success">閱讀更多...</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={require(`../images/LatestNews.png`)}
              alt="..."
              className="card-images"
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
