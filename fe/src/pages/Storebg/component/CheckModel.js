import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";

const CheckModel = ({ productValid, productId }) => {
  // 上下架 修改按鈕
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // http://localhost:3002/api/member/password (router.post)
      let response = await axios.post(`${API_URL}/storebg/productslistvalid`);
      console.log("會員有更改密碼: ", response.data);
    } catch (e) {
      console.error("valid error: ", ERR_MSG[e.response.data.code]);
      console.error("res.error:", e.response.data);
      // setErr(e.response.data.msg);
      // setErr({ ...err, confirmPassword: e.response.data.msg });
    }
  }
  return (
    <div>
      <div
        className="modal fade"
        id={"takeDown" + productId}
        // tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-footer storebg-modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body mx-auto fw-bold">
              {/* 不管item.valid 等於 1 或 0 只會顯示 true 的結果 */}
              {productValid === 1 ? "確定下架商品嗎?" : "確定上架商品嗎?"}
            </div>
            <div className="modal-footer storebg-modal-footer  mx-auto">
              <button
                type="submit"
                className={
                  (productValid === 1
                    ? "btn-danger"
                    : "storebg-model-btn-green") + " btn"
                }
                onClick={handleSubmit}
              >
                確定
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckModel;
