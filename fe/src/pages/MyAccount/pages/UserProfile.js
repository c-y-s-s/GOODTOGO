import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL, IMAGE_URL, PROFILE_IMAGE_URL } from "../../../utils/config";
import { ERR_MSG } from "../../../utils/error";
import { FiFolder } from "react-icons/fi";

const UserProfile = (props) => {
  // console.log(props);

  // input 欄位文字內容
  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    photo: "",
  });

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
    console.log("/member/profile 上傳圖片檔名 file.name: ", file.name); // e.target.files[0].name
    console.log("/member/profile 要 setMember 的圖片 file(二進位檔): ", file); // e.target.files[0]
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
      console.log("使用者有上傳資料: ",response.data);
      // 更新資料於 index.js 姓名、頭貼(儲存後)
      props.setUserName(response.data.name);
      props.setHeadShot(response.data.photo);

    } catch (e) {
      // TODO: 不同錯誤訊息另外包state存，先判斷進來的是什麼號碼=某種錯誤，去客製化
      console.error("會員修改資料 error: ", ERR_MSG[e.response.data.code]);
      console.error("res.error:", e.response.data);
      setErr(e.response.data.msg);
    }
  }

  return (
    <>
      <div className="col-md-9 col-lg-10 ps-lg-5 mt-3 mt-md-0">
        <div className="page_Title d-flex justify-content-center justify-content-md-start">
          會員資料修改
        </div>
        <hr></hr>
        {/* -------- 會員資料 表單開始 -------- */}
        <form>
          <div className="row mt-4">
            {/* -------- 表單左 -------- */}
            <div className="col-lg-7 form_Text pe-4 order-2 order-lg-1">
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="name"
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
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
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
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
                <div className="error text-danger text-end">
                  {err.email ? err.email.msg : ""}
                </div>
              </div>
              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="phone"
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
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

              <div className="my-4">
                <div className="d-flex align-items-center text-nowrap">
                  <label
                    htmlFor="password"
                    className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"
                  >
                    其他資訊
                  </label>
                  <div className="d-flex w-100">
                    <Link to="/member/password" className="w-100 pe-2">
                      <button className="btn btn_Other w-100">更改密碼</button>
                    </Link>
                    <Link to="/member/payment" className="w-100 ps-2">
                      <button className="btn btn_Other w-100">
                        更改信用卡資訊
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="error text-danger text-end"></div>
              </div>

              <div className="d-flex align-items-center text-nowrap">
                <div className="col-3 col-sm-2 col-lg-3 col-xl-2 me-sm-3"></div>
                <div className="d-flex justify-content-start justify-content-sm-center w-100">
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
            <div className="col-lg-5 order-1 order-lg-2 d-flex d-lg-block justify-content-center align-items-center">
              <div className="user_Upload_Img ms-4 ms-lg-0 my-4 mt-lg-4 d-flex d-lg-block align-items-center">
                {/* user head shot */}
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
                <div className="d-block">
                  {/* 選擇圖片按鈕 */}
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
                    <span className="text-white text-nowrap">選擇圖片</span>
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
                  {/* 上傳文字提醒 */}
                  <span className="d-flex mt-3 mx-1 mx-sm-3 justify-content-center fz-sm ls-sm c-grey">
                    .jpg/.jpeg/.png 上限 2MB
                  </span>
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

export default UserProfile;
