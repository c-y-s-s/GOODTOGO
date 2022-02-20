import React, { useState } from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
import { FiArrowUpCircle } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
const ProductsDetailsComment = ({ productModalCommentData }) => {
  let data = productModalCommentData;
  console.log(data);
  // 評價排序開關
  const [starSort, setStarSort] = useState();
  // 時間排序開關
  const [timeSort, setTimeSort] = useState();

  //! 有 bug 待修 其中一個如果後面先點 再點會失效
  // 評價排序判斷
  if (starSort) {
    data = [...data].sort((a, b) => a.star - b.star);
  } else if (starSort === false) {
    data = [...data].sort((a, b) => b.star - a.star);
  }
  // 時間排序判斷
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

  console.log("timeSort", timeSort, "starSort", starSort);

  // 評價排序開關
  function handleStarSort() {
    setStarSort(!starSort);
  }
  // 時間排序開關
  function handleTimeSort() {
    setTimeSort(!timeSort);
  }

  // console.log("最上層", productModalcommentData);
  return (
    <div>
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
