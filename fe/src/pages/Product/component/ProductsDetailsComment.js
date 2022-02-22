import React, { useState } from "react";
// -------- react icon --------
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { FiArrowUpCircle } from "react-icons/fi";
// -------- MUI  Rating--------
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";



const ProductsDetailsComment = ({ productModalCommentData }) => {

  let data = productModalCommentData;

  // 評價排序開關
  const [starSort, setStarSort] = useState();
  // 時間排序開關
  const [timeSort, setTimeSort] = useState();

  // 評價排序判斷
  if (starSort) {
    data = [...data].sort((a, b) => a.star - b.star);
  } else if (starSort === false) {
    data = [...data].sort((a, b) => b.star - a.star);
  }
  // 時間排序判斷 原本字串轉換成數字才能比對 
  if (timeSort) {
    data = [...data].sort(
      (a, b) =>
        parseInt(Date.parse(a.create_time)) -
        parseInt(Date.parse(b.create_time))
    );
  } else if (timeSort === false) {
    data = [...data].sort(
      (a, b) =>
        parseInt(Date.parse(b.create_time)) -
        parseInt(Date.parse(a.create_time))
    );
  }

  // 評價排序開關
  function handleStarSort() {
    setStarSort(!starSort);
    // 清空 time 開關值才不會有衝突
    setTimeSort("")
  }
  // 時間排序開關
  function handleTimeSort() {
    setTimeSort(!timeSort);
    setStarSort("");
  }

  return (
    <div>
      {/* // 判斷有無資料 */}
      {productModalCommentData.length ? (
        <div className="product-users-comment">
          <a href="#product-top" className="product-users-comment-gotop">
            <FiArrowUpCircle />
          </a>
          <div className="comment-filter d-flex justify-content-between mt-4">
            <div className="d-flex product-users-comment-filter">
              <div className="me-2 product-users-comment-filter-star">
                評分
                <button
                  className="product-users-comment-filter-icon"
                  onClick={handleStarSort}
                >
                  <RiArrowUpDownFill />
                </button>
              </div>
              <div className="product-users-comment-filter-time">
                留言時間
                <button
                  className="product-users-comment-filter-icon"
                  onClick={handleTimeSort}
                >
                  <RiArrowUpDownFill />
                </button>
              </div>
            </div>
            <div>共 {productModalCommentData.length} 則評論</div>
          </div>
          {data.map((item) => {
            return (
              <div
                className="d-flex mt-3 product-users-comment-data mt-4"
                key={item.id}
              >
                <div className="product-users-comment-photo ratio ratio-4x3">
                  <img
                    className=" img-fluid  cover-photo"
                    src={require(`../images/pexels-charles-1851164.jpg`)}
                    alt=""
                  />
                </div>
                <div className="ms-3 product-users-comment-userdata">
                  <div className="d-flex justify-content-between">
                    <div className="product-users-comment-userdata-name">
                      {item.name}
                    </div>
                    <div className="d-flex product-users-comment-userdata-time">
                      <div>{item.create_time}</div>
                      <div className="">
                        <button
                          className=" user-data-report"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <FiMoreVertical />
                        </button>
                        <ul className="dropdown-menu">
                          <a href="">檢舉</a>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="product-users-comment-userdata-star">
                    <div>
                      <Stack spacing={1}>
                        <Rating
                          name="half-rating-read"
                          defaultValue={item.star}
                          precision={0.1}
                          readOnly
                        />
                      </Stack>
                    </div>
                    {console.log(item.star)}
                  </div>
                  <div className="product-users-comment-userdata-text">
                    {item.comment}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="nothing-product-comment">商品還沒有評論呦</div>
      )}
    </div>
  );
};

export default ProductsDetailsComment;
