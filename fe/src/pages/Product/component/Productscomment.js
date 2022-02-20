import { FiMoreVertical } from "react-icons/fi";
import React from "react";
import { useParams, Link } from "react-router-dom";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
// -------- 商品評論 --------
const StoreProductsComment = ({
  productsComment,
  totalPages,
  getPages,
  setPage,
}) => {
  const { currentPage } = useParams();

  console.log("ccc", currentPage);
  let page = parseInt(currentPage, 10) || 1;

  return (
    <div>
      <div className="container products-comment">
        <div>
          <div className="d-flex  justify-content-between text-end products-comment-total">
            <div className="d-flex product-users-comment-filter">
              <div className="me-2 product-users-comment-filter-star">
                評分
                <button className="product-users-comment-filter-icon">
                  <RiArrowUpDownFill />
                </button>
              </div>
              <div className="product-users-comment-filter-time">
                留言時間
                <button className="product-users-comment-filter-icon">
                  <RiArrowUpDownFill />
                </button>
              </div>
            </div>
            <div>共 {totalPages} 則留言</div>
          </div>
        </div>
        {productsComment.map((item) => {
          {
            console.log(item);
          }
          return (
            <div className="col-12 mt-3 product-comment">
              <div className="d-flex justify-content-between ">
                <div className="d-flex user-data w-100">
                  <div>
                    <div className="user-photo mt-3">
                      <img
                        className="cover-photo"
                        src={require(`../../../images/store_img/01.jpg`)}
                        alt=""
                      />
                    </div>
                  </div>

                  <div className="ms-4 w-100">
                    <div className="d-flex justify-content-between align-items-center flex-wrap">
                      <div className="pt-2 user-data-name">{item.name}</div>
                      <div className="d-flex align-items-center">
                        <div className="user-data-comment-time">
                          {/* 2021-12-12 10 : 10 PM */}
                          {item.create_time}
                        </div>
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
                    <div className="d-flex justify-content-between  product-data">
                      <div>
                        <div className="d-flex ">
                          <div className="">
                            <div>
                              <Stack spacing={1}>
                                <Rating
                                  name="half-rating-read"
                                  defaultValue={item.star}
                                  precision={0.1}
                                  readOnly
                                />
                              </Stack>
                              <div>product name</div>
                            </div>
                          </div>
                          <div className="ps-3 product-data-name">
                            {item.products}
                          </div>
                        </div>
                        <p className="pt-2 mb-0 user-comment">{item.comment}</p>
                      </div>
                      <img
                        className="product-photo "
                        src={require(`../../../images/store_img/01.jpg`)}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="text-end">
                  <div className="d-flex">
                    <div className="d-flex"></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {/* // 頁碼功能 */}
        <div className="products-comment-pagination">
          {/* // ! 前一頁 後一頁功能未完成 */}
          <div className="pages-icon">
            
            <Link to={`${page - 1}`} className="page-arrow" >
              <FiChevronLeft />
            </Link>
          </div>
          <div>
            {getPages.map((item) => {
              return item;
            })}
          </div>
          <div className="pages-icon">
            <Link to={`${page + 1}`} className="page-arrow">
              <FiChevronRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreProductsComment;
