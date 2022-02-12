import React from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import icon1 from "./imges/Vector3.png";
import { FiBell } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import { FiFilter } from "react-icons/fi";
const Admin = () => {
  return (
    <div className="background-admin">
      <div className="background-admin-data">
        <div className="d-flex position-relative">
          <div className="vh-100 background-admin-data-left">
            {/* -------- 左邊欄位區塊開始 --------*/}
            <div className="background-admin-data-left-nav">
              <div className="background-admin-data-left-nav-logo">
                <Logo />
              </div>
              <ul>
                <li className="active">
                  <a href="">
                    <img src={icon1} style={icon1.logo} alt="fireSpot" />
                    店家申請
                  </a>
                </li>
                <li className="">
                  <a href="" className="">
                    <img src={icon1} style={icon1.logo} alt="fireSpot" />
                    店家列表
                  </a>
                </li>
              </ul>
            </div>
            {/* -------- 左邊欄位區塊結束 --------*/}
          </div>

          {/* -------- 右邊欄位區塊開始 --------*/}
          <div className="p-0 background-admin-data-right  ">
            {/* -------- 上方導覽列開始 -------- */}
            <nav className="background-admin-data-right-nav">
              <div className="background-admin-data-right-nav-title">
                店家申請
              </div>
              <div class="background-admin-data-right-nav-content">
                <form action="">
                  <div className="d-flex">
                    <div>
                      <a href="" className="me-3 icon">
                        <FiSearch />
                      </a>
                    </div>
                    <input type="text rounded-3" />
                  </div>
                </form>

                <div className="px-3 ">
                  <a href="#" className="icon icon-border">
                    <FiBell />
                  </a>
                </div>
                <div className="username">管理員 : admin01</div>
                <div className="user-photo">
                  <img src={require(`./imges/4.1.jpg`)} alt="" />
                </div>
                <button type="button" class="btn btn-warning mx-3">
                  登出
                </button>
              </div>
            </nav>
            {/* -------- 上方導覽列結束 -------- */}

            {/* -------- 白色主要內容區塊開始 -------- */}
            <div className="background-admin-data-right-content">
              <div className="d-flex justify-content-end ">
                <button
                  class="background-admin-data-right-sort me-4"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FiFilter />
                  排序
                </button>
                <ul class="dropdown-menu background-admin-data-right-sort-options">
                  <li>
                    <a href="#">申請日期</a>
                  </li>
                  <li>
                    <a href="#">店家名稱</a>
                  </li>
                </ul>
              </div>
              <div className="d-flex justify-content-between my-3">
                <div>第 1 ~ 8 筆</div>
                <div className="text-end ">共20筆資料</div>
              </div>
              {/* -------- 表格 資料主要呈現區塊開始 -------- */}
              <table class="table background-admin-data-right-content-table">
                <thead>
                  <tr>
                    <th scope="col">負責人</th>
                    <th scope="col">店家名稱</th>
                    <th scope="col">帳號</th>
                    <th scope="col">信箱</th>
                    <th scope="col">電話</th>
                    <th scope="col">申請日期</th>
                    <th scope="col">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="#">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                  <tr>
                    <td>王大明</td>
                    <td>小胖烘焙房 山頂店</td>
                    <td>aaa111</td>
                    <td>afsafafsa@gmail.com</td>
                    <td>00000000</td>
                    <td>
                      Feb 01,2022
                      <div className="ps-3 text-secondary">6:30 pm</div>
                    </td>
                    <td>
                      <a href="">詳細資料</a>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* -------- 表格 資料主要呈現區塊結束 -------- */}
              {/* -------- 分頁區塊開始 --------*/}
              <nav
                aria-label="Page navigation example m-auto "
                className="background-admin-data-right-content-pages"
              >
                <ul class="pagination justify-content-center">
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true">&laquo;</span>
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                      <span aria-hidden="true">&raquo;</span>
                    </a>
                  </li>
                </ul>
              </nav>
              {/* -------- 分頁區塊結束--------*/}
            </div>
            {/* -------- 白色主要內容區塊開始 -------- */}
          </div>
          {/* -------- 右邊欄位區塊結束 --------*/}
        </div>
      </div>
    </div>
  );
};

export default Admin;
