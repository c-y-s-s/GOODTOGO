import React from "react";
import Card from "react-credit-cards";
import axios from "axios";
import { API_URL } from "../../../../utils/config";
// import { ERR_MSG } from "../../../../utils/error";
import Swal from "sweetalert2";

// import SupportedCards from "./Cards";

import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  // formatFormData
} from "./utils";

import "react-credit-cards/es/styles-compiled.css";

export default class CreditCard extends React.Component {
  state = {
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { issuer } = this.state;
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});
    // this.setState({ formData });
    // this.form.reset();
    console.log(formData)

    let updateCreditCard = async () => {
      try {
        let data = { ...formData };
        let cardNumber = { number: data.number };
        // console.log("cardNumber", cardNumber);

        // http://localhost:3002/api/member/payment/edit (router.post)
        let response = await axios.post(
          `${API_URL}/member/payment/edit`,
          cardNumber,
          {
            withCredentials: true,
          }
        );
        console.log("使用者有更新信用卡: ", response.data);
        this.props.setCreditNum(response.data.fourNum);

        // sweet alert
        Swal.fire({
          // position: 'top-end',
          icon: "success",
          title: "資料儲存成功",
          showConfirmButton: false,
          timer: 1500,
        });

        // 清除表單資料
        this.form.reset();
        this.setState({
          number: "",
          name: "",
          expiry: "",
          cvc: "",
          issuer: "",
          focused: "",
          formData: null,
        });

        // 關閉燈箱 (與 sweet alert 一起關閉)
        setTimeout(() => {
          // this.props.setisModalTouch(true);
          // this.props.setOpenCreditHeight(false);
          // this.props.setOpenCredit(false);
          // 可直接傳遞 handleClose 函式
          this.props.handleClose();
        }, 1500);
      } catch (e) {
        // console.error("會員修改信用卡 error: ", ERR_MSG[e.response.data.code]);
        console.error("res.error:", e.response.data);
        // setErr(e.response.data.msg);
      }
    };
    updateCreditCard();
  };

  render() {
    const { name, number, expiry, cvc, focused, issuer, formData } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            cvc={cvc}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
            <div className="form-group mt-4">
              <input
                type="tel"
                name="number"
                className="form-control form_Input my-3"
                placeholder="請輸入信用卡號碼"
                pattern="[\d| ]{16,22}"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
              {/* <small>E.g.: 49..., 51..., 36..., 37...</small> */}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="name"
                className="form-control form_Input my-3"
                placeholder="持卡人姓名"
                required
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
              />
            </div>
            <div className="row my-3">
              <div className="col-6">
                <input
                  type="tel"
                  name="expiry"
                  className="form-control form_Input"
                  placeholder="有效期限 月/年"
                  pattern="\d\d/\d\d"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
              <div className="col-6">
                <input
                  type="tel"
                  name="cvc"
                  className="form-control form_Input"
                  placeholder="驗證碼 CVC"
                  pattern="\d{3,4}"
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </div>
            </div>
            <input type="hidden" name="issuer" value={issuer} />
            <div className="form-actions text-center">
              <button
                className="btn text-white btn_Credit"
                disabled={
                  // 三欄位不為空 才能按儲存鈕
                  this.state.number === "" ||
                  this.state.name === "" ||
                  this.state.expiry === "" ||
                  this.state.cvc === ""
                    ? true
                    : false
                }
              >
                儲&emsp;存
              </button>
            </div>
          </form>
          {/* {formData && (
            <div className="App-highlight">
              {formatFormData(formData).map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
          )}
          <hr style={{ margin: "60px 0 30px" }} />
          <div className="App-badges">
            <a
              href="https://github.com/amarofashion/react-credit-cards"
              className="github__btn"
            >
              <img
                alt="View on GitHub"
                src="https://cdn.jsdelivr.net/gh/gilbarbara/logos@2017.12/logos/github-icon.svg"
              />
              <span>View on GitHub</span>
            </a>

            <a href="https://codesandbox.io/s/ovvwzkzry9">
              <img
                alt="Edit ovvwzkzry9"
                src="https://codesandbox.io/static/img/play-codesandbox.svg"
              />
            </a>
          </div>
          <hr style={{ margin: "30px 0" }} />
          <SupportedCards /> */}
        </div>
        {/* <div className="App-credits">
          Made with ❤️ at <a href="https://amaro.com/">AMARO</a>.
        </div> */}
      </div>
    );
  }
}
