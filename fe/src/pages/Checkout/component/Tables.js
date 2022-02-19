import React from "react";
import { BiStoreAlt } from "react-icons/bi";

const Tables = () => {
  return (
    <div>
      <div className="border my-5 px-4">
        <table className="table table-borderless">
          <thead className="border-bottom">
            <tr>
              <th scope="col">
                <div className="d-inline pe-2">
                  <BiStoreAlt className="me-1" />
                  鵝媽媽總店
                </div>
                <div className="d-inline rounded-pill product-category px-1">
                  麵食
                </div>
              </th>
              <th scope="col" className="text-center">
                單價
              </th>
              <th scope="col" className="text-center">
                數量
              </th>
              <th scope="col" className="text-end">
                小計
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-bottom">
              <th scope="row">
                <img
                  src={require(`../images/testimage.png`)}
                  alt="..."
                  className="product-image me-3"
                />
                鴨肉蓋飯
              </th>
              <td className="text-center align-middle">$ 60</td>
              <td className="text-center align-middle">2</td>
              <td className="text-end align-middle">$ 120</td>
            </tr>
            <tr className="border-bottom">
              <th scope="row">
                <img
                  src={require(`../images/testimage.png`)}
                  alt="..."
                  className="product-image me-3"
                />
                鴨肉蓋飯
              </th>
              <td className="text-center align-middle">$ 60</td>
              <td className="text-center align-middle">2</td>
              <td className="text-end align-middle">$ 120</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="border-bottom">
              <th scope="row" className="py-5"></th>
              <td className="text-center align-middle">
                <div className="d-inline">使用優惠劵：</div>
                <div className="d-inline border border-warning px-1">-$ 60</div>
              </td>
              <td className="text-center align-middle">付款金額：</td>
              <td className="text-end align-middle fs-5 text-warning fw-bold">
                NT$ 240
              </td>
            </tr>
          </tfoot>
        </table>
        <div className="pt-1 pb-3 d-flex justify-content-end">
          {/* <button type="button" className="btn credit-card px-5 me-5">
            信 用 卡 付 款
          </button>
          <div className="d-inline me-3">
            <img src={require(`../images/visa.png`)} alt="..."/>
          </div>
          <div className="d-inline d-flex align-items-center me-3">****</div>
          <div className="d-inline d-flex align-items-center me-3">****</div>
          <div className="d-inline d-flex align-items-center me-3">****</div>
          <div className="d-inline d-flex align-items-center me-5">****</div>
          <button
            type="button"
            className="btn text-light px-5 complete-checkout"
          >
            完 成 結 帳
          </button> */}

          <button type="button" className="btn credit-card px-5 me-5">
            現 場 取 貨 付 款
          </button>
          <button
            type="button"
            className="btn text-light px-5 complete-checkout"
          >
            完 成 結 帳
          </button>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#successfullyOrdered"
          >
            Launch demo modal
          </button>
          <div
            className="modal fade"
            id="successfullyOrdered"
            // tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                  <img src={require(`../images/check.png`)} alt="..."/>

                    訂購成功
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">...</div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-primary">
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
