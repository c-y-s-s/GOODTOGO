import React from 'react'

const Table = () => {
  return (
    <div>
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
        </tbody>
      </table>
    </div>
  );
}

export default Table