import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { FiEye, FiEyeOff } from "react-icons/fi";

// TODO: 密碼格式錯誤判斷
// TODO: 密碼後台驗證失敗 res 錯誤訊息呈現於 alert

const UserPassword = () => {
  // 儲存使用者輸入值
  const [password, setPassword] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 錯誤訊息開關
  const [err, setErr] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 切換看密碼開關
  const [eye, setEye] = useState({
    passwordEye: false,
    newPasswordEye: false,
    confirmPasswordEye: false,
  });

  // -------- 各欄位 切換顯示密碼 --------
  function passwordShow() {
    setEye(
      eye.passwordEye
        ? { ...eye, passwordEye: false }
        : { ...eye, passwordEye: true }
    );
  }
  function newPasswordShow() {
    setEye(
      eye.newPasswordEye
        ? { ...eye, newPasswordEye: false }
        : { ...eye, newPasswordEye: true }
    );
  }
  function confirmPasswordShow() {
    setEye(
      eye.confirmPasswordEye
        ? { ...eye, confirmPasswordEye: false }
        : { ...eye, confirmPasswordEye: true }
    );
  }

  // function handleClear(e) {
  //   setErr({ ...err, password: "" });
  // }

  // -------- 使用者修改密碼 --------
  function handleChange(e) {
    // 使用者正在輸入 欄位, 值 -> 同步(O)
    // console.log(e.target.name, e.target.value);

    // 儲存表單的值
    setPassword({ ...password, [e.target.name]: e.target.value });

    // setPassword 不同步
    // console.log("newPassword: ", password.newPassword);
    // console.log("confirmPassword: ", password.confirmPassword);
    // -> 需用當下輸入值判斷 password.newPassword !== e.target.value

    // reCheckPassword();
    // setPassword 完後 才 reCheckPassword() 判斷新密碼是否一致 -> 不同步(X)

    // 用當下輸入值判斷 -> 同步(O)
    if (
      // 輸入 確認新密碼(e.target.value) 的當下
      // 去判斷 是否與 新密碼(password.newPassword)的欄位值(不為空) 一致
      (password.newPassword !== "" &&
        e.target.name === "confirmPassword" &&
        password.newPassword !== e.target.value) ||
      // 或
      // 輸入 新密碼(e.target.value) 的當下
      // 去判斷 是否與 輸入新密碼(password.confirmPassword)的欄位值(不為空) 一致
      (password.confirmPassword !== "" &&
        e.target.name === "newPassword" &&
        password.confirmPassword !== e.target.value) ||
      // 或
      // 輸入 密碼(e.target.value) 的當下
      // 去判斷 新密碼 與 確認新密碼的欄位值(不為空) 是否一致
      (password.newPassword !== "" &&
        password.confirmPassword !== "" &&
        e.target.name === "password" &&
        password.newPassword !== password.confirmPassword)
    ) {
      setErr({
        ...err,
        confirmPassword: "新的密碼 與 確認新密碼 輸入不一致",
        password: "",
      });
    } else {
      setErr({ ...err, confirmPassword: "", password: "" });
    }
  }

  // setPassword 完後 才 reCheckPassword() 判斷新密碼是否一致 -> 不同步(X)
  // function reCheckPassword() {
  //   console.log("err1: ", err);
  //   password.newPassword === password.confirmPassword
  //     ? setErr({ ...err, confirmPassword: "" })
  //     : setErr({ ...err, confirmPassword: "確認密碼與新密碼 輸入不一致" });
  //   console.log("err2: ", err);
  // }

  // -------- 修改會員密碼 進資料庫 --------
  // 發 http request 到後端 -> axios
  async function handleSubmit(e) {
    e.preventDefault();
    // password.password === ""
    //   ? setErr({ ...err, password: "請輸入密碼" })
    //   : setErr({ ...err, password: "" });

    // password.newPassword === ""
    //   ? setErr({ ...err, newPassword: "請輸入新密碼" })
    //   : setErr({ ...err, newPassword: "" });

    // password.confirmPassword === ""
    //   ? setErr({ ...err, newPassword: "請輸入確認密碼" })
    //   : setErr({ ...err, newPassword: "" });

    try {
      // http://localhost:3002/api/member/password (router.post)
      let response = await axios.post(`${API_URL}/member/password`, password);
      console.log("會員有更改密碼: ", response.data);
      // 清空
      setPassword({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
      setEye({
        passwordEye: false,
        newPasswordEye: false,
        confirmPasswordEye: false,
      });
    } catch (e) {
      console.error("會員更改密碼 error: ", ERR_MSG[e.response.data.code]);
      setErr({ ...err, password: ERR_MSG[e.response.data.code] });
      console.error("res.error:", e.response.data);
      // setErr(e.response.data.msg);
      // setErr({ ...err, confirmPassword: e.response.data.msg });
    }
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          更改密碼
        </div>
        <hr></hr>
        {/* -------- 更改密碼 表單開始 -------- */}
        <form>
          <div className="row mt-4">
            {/* -------- 表單左 -------- */}
            <div className="col-md-12 col-lg-8 form_Text">
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap position-relative">
                  <label
                    htmlFor="password"
                    className="col-3 col-sm-3 col-lg-3 col-xl-2 me-xl-4"
                  >
                    現在的密碼
                  </label>
                  <input
                    id="password"
                    type={eye.passwordEye ? "text" : "password"}
                    name="password"
                    className={
                      err.password
                        ? "form-control form_Input form_Input_Password form_Input_SmallSize border-danger"
                        : "form-control form_Input form_Input_Password form_Input_SmallSize"
                    }
                    value={password.password}
                    placeholder="請輸入目前登入的密碼"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <div onClick={passwordShow}>
                    {eye.passwordEye ? (
                      <FiEye className="eye_Open me-3 position-absolute end-0 translate-middle-y" />
                    ) : (
                      <FiEyeOff className="eye_Close me-3 position-absolute end-0 translate-middle-y" />
                    )}
                  </div>
                </div>
                <div className="error text-danger text-end">
                  {err.password ? err.password : ""}
                </div>
              </div>

              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap position-relative">
                  <label
                    htmlFor="newPassword"
                    className="col-3 col-sm-3 col-lg-3 col-xl-2 me-xl-4"
                  >
                    新的密碼
                  </label>
                  <input
                    id="newPassword"
                    type={eye.newPasswordEye ? "text" : "password"}
                    name="newPassword"
                    className={
                      err.confirmPassword
                        ? "form-control form_Input form_Input_Password form_Input_SmallSize border-danger"
                        : "form-control form_Input form_Input_Password form_Input_SmallSize"
                    }
                    value={password.newPassword}
                    placeholder="設定新密碼"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <div onClick={newPasswordShow}>
                    {eye.newPasswordEye ? (
                      <FiEye className="eye_Open me-3 position-absolute end-0 translate-middle-y" />
                    ) : (
                      <FiEyeOff className="eye_Close me-3 position-absolute end-0 translate-middle-y" />
                    )}
                  </div>
                </div>
                <div className="error text-danger text-end"></div>
              </div>
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap position-relative">
                  <label
                    htmlFor="confirmPassword"
                    className="col-3 col-sm-3 col-lg-3 col-xl-2 me-xl-4"
                  >
                    確認新密碼
                  </label>
                  <input
                    id="confirmPassword"
                    type={eye.confirmPasswordEye ? "text" : "password"}
                    name="confirmPassword"
                    className={
                      err.confirmPassword
                        ? "form-control form_Input form_Input_Password form_Input_SmallSize border-danger"
                        : "form-control form_Input form_Input_Password form_Input_SmallSize"
                    }
                    value={password.confirmPassword}
                    placeholder="再次輸入即將設定的新密碼"
                    autoComplete="off"
                    onChange={handleChange}
                  />
                  <div onClick={confirmPasswordShow}>
                    {eye.confirmPasswordEye ? (
                      <FiEye className="eye_Open me-3 position-absolute end-0 translate-middle-y" />
                    ) : (
                      <FiEyeOff className="eye_Close me-3 position-absolute end-0 translate-middle-y" />
                    )}
                  </div>
                </div>
                <div className="error text-danger text-end">
                  {err.confirmPassword ? err.confirmPassword : ""}
                </div>
              </div>

              <div className="d-flex align-items-center text-nowrap">
                <div className="col-3 col-sm-3 col-lg-3 col-xl-2 me-xl-4"></div>
                <div className="d-flex justify-content-start justify-content-md-center w-100">
                  <button
                    type="submit"
                    className="btn text-white btn_Submit form_Input_SmallSize"
                    onClick={handleSubmit}
                    disabled={
                      // 三欄位不為空 且 新密碼與確認密碼一致 才能按儲存鈕
                      password.password !== "" &&
                      password.newPassword !== "" &&
                      password.confirmPassword !== "" &&
                      password.newPassword === password.confirmPassword &&
                      err.password === ""
                        ? false
                        : true
                    }
                  >
                    儲&emsp;存
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* -------- 會員資料表單結束 -------- */}
      </div>
    </>
  );
};

export default UserPassword;
