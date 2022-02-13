import React from "react";
// FillMore icon
import { FiMoreVertical } from "react-icons/fi";

const Table = () => {
  return (
    <div>
      <table className="table background-storebg-data-right-content-table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">商店名稱</th>
            <th scope="col">價格</th>
            <th scope="col">數量</th>
            <th scope="col">已售出</th>
            <th scope="col">販售時間</th>
            <th scope="col">上架日期</th>
            <th scope="col">狀態</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className="product-photo">
                <img src={require(`../images/4.1.jpg`)} alt="" />
              </div>
            </td>
            <td>肉鬆麵包</td>
            <td>NT$45</td>
            <td>10</td>
            <td>1</td>
            <td>PM 6:30 ~ PM 8:30</td>
            <td>
              Feb 01,2022
              <div className="ps-3 ">6:30 pm</div>
            </td>
            <td>
              <button
                type="button"
                class="btn storebg-data-red rounded-pill"
                data-bs-toggle="modal"
                data-bs-target="#takeDown"
              >
                下架中
              </button>
              <div
                className="modal fade"
                id="takeDown"
                // tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body mx-auto fw-bold">
                      確定下架商品嗎?
                    </div>
                    <div className="modal-footer  mx-auto">
                      {/* <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button> */}
                      <button type="button" className="btn btn-danger">
                        確定
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                className="background-storebg-data-right-sort "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FiMoreVertical />
              </button>
              <ul className="dropdown-menu background-storebg-data-right-sort-options ">
                <li>
                  <a href="#/">編輯</a>
                </li>
                <li>
                  <a href="#/">刪除</a>
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <td>
              <div className="product-photo align-middle d-flex justify-content-center">
                <img src={require(`../images/4.1.jpg`)} alt="" />
              </div>
            </td>
            <td>肉鬆麵包</td>
            <td>NT$45</td>
            <td>10</td>
            <td>1</td>
            <td>PM 6:30 ~ PM 8:30</td>
            <td>
              Feb 01,2022
              <div className="ps-3 text-secondary">6:30 pm</div>
            </td>
            <td>
              <button
                type="button"
                className="btn storebg-data-green"
                data-bs-toggle="modal"
                data-bs-target="#onTheShelf"
              >
                {/* <a href="#/" className="storebg-data-green"> */}
                上架中
                {/* </a> */}
              </button>
              <div
                className="modal fade"
                id="onTheShelf"
                // tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-sm">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body mx-auto fw-bold">
                      確定上架商品嗎?
                    </div>
                    <div className="modal-footer  mx-auto">
                      {/* <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button> */}
                      <button type="button" className="btn storebg-data-modal-green">
                        確定
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <button
                className="background-storebg-data-right-sort "
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FiMoreVertical />
              </button>
              <ul className="dropdown-menu background-storebg-data-right-sort-options">
                <li>
                  <a href="#/">編輯</a>
                </li>
                <li>
                  <a href="#/">刪除</a>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
