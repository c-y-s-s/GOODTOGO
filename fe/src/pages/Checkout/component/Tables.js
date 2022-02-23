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
              <div className="modal-content position-relative">
                <div className="modal-header border-bottom mx-3">
                  <img
                    src={require(`../images/check.png`)}
                    alt="..."
                    className="check-img me-3"
                  />
                  <div className="text-colors-g">
                    {/* <h5 className="d-inline">訂購成功</h5> */}
                    {/* <div className="aaa">訂購成功</div> */}
                    <h5>訂購成功</h5>
                    <h6>謝謝您替地球盡的每份力量</h6>
                    {/* <div className="aaa">謝謝您替地球盡的每份力量</div> */}
                    {/* <h6 className="aaa d-inline">謝謝您替地球盡的每份力量</h6> */}
                  </div>
                  <button
                    type="button"
                    className="btn-close closeBtn"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body row">
                  <div className="d-flex justify-content-center mb-1 text-size text-colors-g">
                    訂單時間: 2022-02-11 12:22:33
                  </div>
                  <div className="d-flex justify-content-center text-size my-2 ">
                    <button className="order-bt border-0 px-5">訂單編號: XXXXXXX</button>
                  </div>
                  <div className="d-flex justify-content-center mb-1 text-size">
                    已傳送到您的電子信箱
                  </div>
                  <div className="d-flex justify-content-center mb-1 text-size">
                    取餐時請
                    <span className="text-colors-g">
                      &nbsp;出示訂單編號 &nbsp;
                    </span>
                    取餐
                  </div>
                  <div className="d-flex justify-content-center mb-1 text-size">
                    或可至
                    <span className="text-colors-g ">
                      &nbsp;我的訂單 {">"} 待領取 &nbsp;
                    </span>
                    頁面查看訂單編號
                  </div>
                </div>
                <div className="modal-footer border-top mx-3">
                  <div className="text-size mx-4">
                    <div>
                      <img
                        src={require(`../images/subtract.png`)}
                        alt="..."
                        className="ms-3 pt-2 me-3 float-start"
                      />
                    </div>
                    <div className="text-colors-dy">
                      請於當日店家營業結束前取餐， 逾時未取餐，帳號將停權一個月
                    </div>
                  </div>
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
