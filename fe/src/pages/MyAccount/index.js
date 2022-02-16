import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../utils/config";
import { ERR_MSG } from "../../utils/error";
import { FiUser, FiClipboard, FiGift, FiFolder } from "react-icons/fi";

// user 帶著 session 進入此頁

const MyAccount = () => {
  // input 欄位文字內容
  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });

  // db head shot
  const [headShot, setHeadShot] = useState("");

  // input 上傳的圖片物件(二進位檔)
  const [imageSrc, setImageSrc] = useState("");

  // 錯誤訊息
  const [err, setErr] = useState({});
  // FIXME: 前後端錯誤訊息

  // -------- 顯示使用者資料 --------
  useEffect(() => {
    // http://localhost:3002/api/member/proile
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/member/profile`, {
        withCredentials: true, // 為了跨源存取 cookie // 登入狀態帶著 cookie 跟後端要資料
      });
      // response 是物件
      console.log("api/member/profile(get) response.data: ", response.data);
      setMember(response.data);
      console.log(
        "api/member/profile(get) response.data.photo: ",
        response.data.photo
      );
      // 另外存 db head shot 要顯示頭貼用 不能與上傳的綁在一起
      setHeadShot(response.data.photo);
    };
    getUser();
  }, []);

  // -------- 使用者修改資料 --------
  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value });
  }

  // -------- 使用者預覽上傳圖片 --------
  const handleOnPreview = (e) => {
    const file = e.target.files[0]; // 抓取上傳的圖片
    const reader = new FileReader(); // 讀取 input type="file" 的 file
    reader.addEventListener(
      "load",
      function () {
        // convert image file to base64 string
        setImageSrc(reader.result);
      },
      false // false -> e.preventDefault() 阻擋預設行為
    );

    if (file) {
      reader.readAsDataURL(file);
      // readAsDataURL 將讀取到的檔案編碼成 Data URL 內嵌網頁裡
    }
    console.log("上傳的圖片檔名 file.name: ", file.name); // e.target.files[0].name
    console.log("setMember 要上傳的圖片 file(二進位檔): ", file); // e.target.files[0]
    setMember({ ...member, [e.target.name]: e.target.files[0] });
  };

  // -------- 修改會員資料進資料庫 --------
  // 發 http request 到後端 -> axios
  async function handleSubmit(e) {
    e.preventDefault();

    // TODO: 利用 refs 驗證欄位?

    try {
      let formData = new FormData(); // 物件
      formData.append("name", member.name);
      formData.append("email", member.email);
      formData.append("phone", member.phone);
      formData.append("photo", member.photo ? member.photo : "");
      // 若沒有新上傳圖片 member.photo 為 db head shot
      // 若 db head shot ="" 則上傳 ""

      // http://localhost:3002/api/member/profile/edit (router.post)
      let response = await axios.post(
        `${API_URL}/member/profile/edit`,
        formData
      );
      console.log(response.data);
    } catch (e) {
      // console.error("會員修改資料 error: ", ERR_MSG[e.response.data.code]);
      console.error("res.error:", e.response.data);
      setErr(e.response.data.msg);
    }
  }

  return (
    <div>
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-2">
            {/* -------- 會員頭貼 -------- */}
            <div className="user_Info d-flex align-items-center mb-5">
              <div>
                <div className="headShot">
                  <img
                    src={headShot ? IMAGE_URL + headShot : PROFILE_IMAGE_URL}
                    // 顯示順序: 資料庫圖片 -> 預設圖片
                    alt="head shot"
                    className="cover-fit"
                  />
                </div>
              </div>
              <p className="ms-4 mb-0 text-nowrap">王小明</p>
            </div>
            {/* -------- 左方選單列開始 -------- */}
            <ul className="list-unstyled text-nowrap d-flex d-lg-block align-items-start justify-content-around">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none menu_Title_unActive" +
                    (isActive ? " menu_Open" : " menu_Close")
                  }
                  to={"/member/profile" || "/member/payment" || "/member/like"}
                >
                  <div>
                    <FiUser className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的帳戶</span>
                </NavLink>
                {/* -------- 我的帳戶選單開始 -------- */}
                <div className="menu_Open">
                  <ul className="list-unstyled mb-4">
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/profile"
                      >
                        會員資料修改
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/payment"
                      >
                        信用卡資訊
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/password"
                      >
                        更改密碼
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        className={({ isActive }) =>
                          "menu_Text text-decoration-none" +
                          (isActive
                            ? " menu_Text_Active"
                            : " menu_Text_unActive")
                        }
                        to="/member/like"
                      >
                        店家收藏清單
                      </NavLink>
                    </li>
                  </ul>
                </div>
                {/* -------- 我的帳戶選單結束 -------- */}
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/member/order"
                >
                  <div>
                    <FiClipboard className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">我的訂單</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    "d-flex align-items-center mb-3 me-5 text-decoration-none" +
                    (isActive ? " menu_Title_Active" : " menu_Title_unActive")
                  }
                  to="/member/coupon"
                >
                  <div>
                    <FiGift className="menu_Icon d-flex" />
                  </div>
                  <span className="menu_Title">優惠券</span>
                </NavLink>
              </li>
            </ul>
            {/* -------- 左方選單列結束 -------- */}
          </div>
          <div className="col-lg-10 ps-5">
            <div className="page_Title">會員資料修改</div>
            <hr></hr>
            {/* -------- 會員資料表單開始 -------- */}
            <form>
              <div className="row">
                {/* -------- 表單左 -------- */}
                <div className="col-lg-7 form_Text pe-5">
                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label
                        htmlFor="name"
                        className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                      >
                        姓名
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        className="form-control form_Input"
                        value={member.name}
                        placeholder="中文 / 英文姓名"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="error text-danger text-end">
                      {err.name ? err.name.msg : ""}
                    </div>
                  </div>

                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label
                        htmlFor="email"
                        className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                      >
                        電子信箱
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control form_Input"
                        value={member.email}
                        placeholder="name@example.com"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="error text-danger text-end">{err.email ? err.email.msg : ""}</div>
                  </div>

                  {/* <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label
                        htmlFor="password"
                        className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                      >
                        密碼
                      </label>
                      <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control form_Input"
                        autoComplete="off"
                        // 資料庫用 session id 撈出使用者密碼
                        disabled
                      />
                      <button className="btn btn_Password ms-3">
                        更改密碼
                      </button>
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div> */}

                  <div className="my-4">
                    <div className="d-flex align-items-center text-nowrap">
                      <label
                        htmlFor="phone"
                        className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"
                      >
                        手機號碼
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        name="phone"
                        className="form-control form_Input"
                        value={member.phone}
                        placeholder="09xxxxxxxx"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="error text-danger text-end"></div>
                  </div>
                  <div className="d-flex align-items-center text-nowrap">
                    <div className="col-3 col-sm-2 col-lg-3 col-xl-2 me-2"></div>
                    <div className="d-flex justify-content-center w-100">
                      <button
                        type="submit"
                        className="btn text-white btn_Submit"
                        onClick={handleSubmit}
                      >
                        儲&emsp;存
                      </button>
                    </div>
                  </div>
                </div>
                {/* -------- 表單右 (上傳大頭照)-------- */}
                <div className="col-lg-5">
                  <div className="user_Upload_Img mt-4">
                    <div>
                      <div className="headShot">
                        <img
                          src={
                            imageSrc
                              ? imageSrc
                              : member.photo
                              ? IMAGE_URL + member.photo
                              : PROFILE_IMAGE_URL
                          }
                          // 顯示順序: 上傳圖片 -> 資料庫圖片 -> 預設圖片
                          alt="head shot"
                          className="cover-fit"
                        />
                      </div>
                    </div>
                    <label className="btn btn_Upload d-flex justify-content-center align-items-center mx-auto mt-4">
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        accept=".jpg,.jpeg,.png"
                        onChange={handleOnPreview}
                      />
                      <div>
                        <FiFolder className="menu_Icon d-flex me-2" />
                      </div>
                      <span className="text-white">選擇圖片</span>
                      {/* {upload ? (
                        <div>
                          <div>
                            <FiFolder className="menu_Icon d-flex me-2" />
                          </div>
                          <span className="text-white">刪除圖片</span>
                        </div>
                      ) : (
                        <div>
                          <div>
                            <FiFolder className="menu_Icon d-flex me-2" />
                          </div>
                          <span className="text-white">選擇圖片</span>
                        </div>
                      )} */}
                    </label>
                  </div>
                </div>
              </div>
            </form>
            {/* -------- 會員資料表單結束 -------- */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
