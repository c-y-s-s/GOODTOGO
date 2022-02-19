import React from "react";
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
const ProductsDetailsCommit = ({ productModalCommitData }) => {
  return (
    <div>
      {productModalCommitData.length ? (
        <div className="product-users-commit">
          <div className="commit-filter d-flex justify-content-between mt-4">
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
            <div>共 {productModalCommitData.length} 則評論</div>
          </div>
          {productModalCommitData.map((item) => {
            return (
              <div
                className="d-flex mt-3 product-users-commit-data mt-4"
                key={item.id}
              >
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
                      {item.name}
                    </div>
                    <div className="d-flex product-users-commit-userdata-time">
                      <div>{item.created_at}</div>
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
                  <div className="product-users-commit-userdata-star">
                    {item.star}
                  </div>
                  <div className="product-users-commit-userdata-text">
                    {item.comment}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="nothing-product-commit">商品還沒有評論呦</div>
      )}
    </div>
  );
};

export default ProductsDetailsCommit;
