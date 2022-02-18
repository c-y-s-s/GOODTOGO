import { FiMoreVertical } from "react-icons/fi";
import React from "react";
import { RiArrowUpDownFill } from "react-icons/ri";

// -------- 商品評論 --------
const StoreProductsCommit = ({ productsComment, totalPages, getPages }) => {
  console.log(productsComment, getPages);
  return (
    <div>
      <div className="container products-commit">
        <div>
          <div className="d-flex  justify-content-between text-end products-commit-total">
            <div className="d-flex product-users-commit-filter">
              <div className="me-2 product-users-commit-filter-star">
                評分
                <button className="product-users-commit-filter-icon">
                  <RiArrowUpDownFill />
                </button>
              </div>
              <div className="product-users-commit-filter-time">
                留言時間
                <button className="product-users-commit-filter-icon">
                  <RiArrowUpDownFill />
                </button>
              </div>
            </div>
            <div>共 {totalPages} 則留言</div>
          </div>
        </div>
        {productsComment.map((item) => {
          return (
            <div className="col-12 mt-3 product-commit">
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
                        <div className="user-data-commit-time">
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
                          <div className="">星星</div>
                          <div className="ps-3 product-data-name">
                            {item.products}
                          </div>
                        </div>
                        <p className="pt-2 mb-0 user-commit">{item.comment}</p>
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
      </div>
      <div>
        {getPages.map((item) => {
          return item;
        })}
      </div>
    </div>
  );
};

export default StoreProductsCommit;
