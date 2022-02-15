import React from 'react'
import { RiArrowUpDownFill } from "react-icons/ri";
import { FiMoreVertical } from "react-icons/fi";
const ProductsDetailsCommit = () => {
  return (
    <div>

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
          <div>共 6 則評論</div>
        </div>
        <div className="d-flex mt-3 product-users-commit-data mt-4">
          <div className="product-users-commit-photo ratio ratio-4x3">
            <img
              className=" img-fluid  cover-photo"
              src={require(`../images/pexels-charles-1851164.jpg`)}
              alt=""
            />
          </div>

          <div className="ms-3 product-users-commit-userdata">
            <div className="d-flex justify-content-between">
              <div className="product-users-commit-userdata-name">王曉明</div>
              <div className="d-flex product-users-commit-userdata-time">
                <div>2022-2-10 10:10 PM</div>
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

            <div className="product-users-commit-userdata-star">星星</div>
            <div className="product-users-commit-userdata-text">太鹹了拔</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetailsCommit