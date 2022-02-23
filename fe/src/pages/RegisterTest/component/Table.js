import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_URL } from '../../../utils/config'
import TwCitySelector from 'tw-city-selector'

const Table = () => {
  const [member, setMember] = useState({
    name: '廖偉順',
    email: '123@gmail.com',
    password: '12345678',
    confirmPassword: '12345678',
    storeName: '麵包店',
    storePhoneNumber: '0987654321',
    county: '',
    district: '',
    storeAddress: '長江路124號',
    logoImage: '',
    businessLicense: '',
  })

  const weekData = [
    { name: 'businessWeekMon', value: 1 },
    { name: 'businessWeekTue', value: 2 },
    { name: 'businessWeekWed', value: 3 },
    { name: 'businessWeekThu', value: 4 },
    { name: 'businessWeekFri', value: 5 },
    { name: 'businessWeekSat', value: 6 },
    { name: 'businessWeekSun', value: 0 },
  ]

  const [weeks, setWeeks] = useState([])

  useEffect(() => {
    setWeeks(weekData)
  }, [])

  const weekChange = (e) => {
    const { name, checked } = e.target
    const tempWeek = weeks.map((week) =>
      week.name === name ? { ...week, isChecked: checked } : week
    )
    setWeeks(tempWeek)
  }

  //地址選擇器
  new TwCitySelector({
    el: '.city-selector-standard-words',
    elCounty: '.county', // 在 el 裡查找 element
    elDistrict: '.district', // 在 el 裡查找 element
    elZipcode: '.zipcode', // 在 el 裡查找 element
    standardWords: true, // 使用正體字 臺
  })

  function handleChange(e) {
    setMember({ ...member, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    // 關掉原本預設的行為
    e.preventDefault()

    try {
      // 方法1: 這個沒有圖片上傳
      // let response = await axios.post(`${API_URL}/auth/register`, member);
      // console.log(response.data);

      // 方法2: 要圖片上傳要用 FormData
      let formData = new FormData()
      formData.append('email', member.email)
      formData.append('name', member.name)
      formData.append('password', member.password)
      formData.append('confirmPassword', member.confirmPassword)
      formData.append('storeName', member.storeName)
      formData.append('storePhoneNumber', member.storePhoneNumber)
      formData.append('county', member.county)
      formData.append('district', member.district)
      formData.append('storeAddress', member.storeAddress)
      formData.append('logoImage', member.logoImage)
      formData.append('businessLicense', member.businessLicense)

      let response = await axios.post(
        `${API_URL}/storeRegister/register`,
        formData
      )
      console.log(response.data)
    } catch (e) {
      // console.error("error", e.response.data);
      // console.error("測試註冊", ERR_MSG[e.response.data.code]);
    }
  }

  return (
    <div>
      <div className="container">
        <div className="row ">
          <div className="col-6">
            <div className="mb-3">
              <label htmlFor="name" className="form-label fw-bold">
                姓名
              </label>
              <input
                className="form-control"
                type="text"
                id="name"
                name="name"
                placeholder="請輸入中文 / 英文姓名"
                value={member.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label fw-bold">
                電子信箱
              </label>
              <input
                className="form-control"
                type="text"
                id="email"
                name="email"
                placeholder="請輸入電子信箱"
                value={member.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                密碼
              </label>
              <input
                className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="請設定密碼"
                value={member.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label fw-bold">
                密碼確認
              </label>
              <div className="input-group has-validation">
                <input
                  className="form-control"
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="請再次輸入密碼確認"
                  value={member.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storeName" className="form-label fw-bold">
                營業店家名稱
              </label>
              <div className="input-group has-validation">
                <input
                  className="form-control"
                  type="text"
                  id="storeName"
                  name="storeName"
                  placeholder="請輸入營業店家名稱"
                  value={member.storeName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storePhoneNumber" className="form-label fw-bold">
                營業店家電話
              </label>
              <div className="input-group has-validation">
                <input
                  className="form-control"
                  type="tel"
                  id="storePhoneNumber"
                  name="storePhoneNumber"
                  maxLength="10"
                  placeholder="請輸入營業店家電話"
                  value={member.storePhoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="storeAddress" className="form-label fw-bold">
                營業店家地址
              </label>
              <div className="input-group has-validation ">
                <div className="input-group mb-3 city-selector-standard-words">
                  <select
                    className="form-select mx-1 text-muted county"
                    id="county"
                    name="county"
                    // value={member.county}
                    // onChange={handleChange}
                    // value={member}
                    // defaultValue=""
                    // onChange={(e) => {
                    //   setMember(e.target.value);
                    // }}
                  ></select>
                  <select
                    className="form-select mx-1 text-muted district"
                    id="district"
                    name="district"
                    // value={member.district}
                    // onChange={handleChange}
                  ></select>
                </div>
                <input
                  className="form-control"
                  type="text"
                  id="storeAddress"
                  name="storeAddress"
                  placeholder="請輸入詳細地址"
                  value={member.storeAddress}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
          <div className="col-6 d-flex justify-content-between  flex-column">
            <div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label htmlFor="logoImage" className="form-label fw-bold">
                    店家 Logo 圖像
                  </label>
                  <label className="text-danger">
                    限用.jpg/.jpeg/.png檔 上限 2MB
                  </label>
                </div>
                <input
                  className=" form-control"
                  type="file"
                  id="logoImage"
                  name="logoImage"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    // 圖片儲存的方式不太一樣
                    setMember({ ...member, logoImage: e.target.files[0] })
                  }}
                />
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <label
                    htmlFor="businessLicense"
                    className="form-label fw-bold"
                  >
                    店家營業登記證
                  </label>
                  <label className="text-danger">
                    限用.jpg/.jpeg/.png檔 上限 2MB
                  </label>
                </div>
                <input
                  className=" form-control"
                  type="file"
                  id="businessLicense"
                  name="businessLicense"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => {
                    // 圖片儲存的方式不太一樣
                    setMember({
                      ...member,
                      businessLicense: e.target.files[0],
                    })
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="name" className="form-label fw-bold">
                  營業星期 (複選)
                </label>
                <div className="businessWeek-bg p-3">
                  <div className="d-flex justify-content-around">
                    {weeks.map((week) => (
                      <div
                        className="form-check form-check-inline"
                        key={week.name}
                      >
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="businessWeekMon"
                          name={week.name}
                          value={week.value}
                          checked={week?.isChecked || false}
                          onChange={weekChange}
                        />
                      </div>
                    ))}
                    {/* <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekTue"
                        name="businessWeekTue"
                        value="2"
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekWed"
                        name="businessWeekWed"
                        value="3"
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekThu"
                        name="businessWeekThu"
                        value="4"
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekFri"
                        name="businessWeekFri"
                        value="5"
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekSat"
                        name="businessWeekSat"
                        value="6"
                      />
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="businessWeekSun"
                        name="businessWeekSun"
                        value="0"
                      />
                    </div> */}
                  </div>
                  <div className="d-flex justify-content-around  mt-2 businessWeek-align">
                    <label
                      className="form-check-label  form-check-inline text-center"
                      htmlFor="businessWeekMon"
                    >
                      一
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekTue"
                    >
                      二
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekWed"
                    >
                      三
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekThu"
                    >
                      四
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekFri"
                    >
                      五
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekSat"
                    >
                      六
                    </label>
                    <label
                      className="form-check-label  form-check-inline"
                      htmlFor="businessWeekSun"
                    >
                      日
                    </label>
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="productCategory" className="form-label fw-bold">
                  店家類別
                </label>
                <select
                  className="form-select"
                  id="productCategory"
                  aria-label="Example select with button addon"
                  defaultValue=""
                >
                  <option value="">請選擇店家販售商品類別</option>
                  <option value="1">港式</option>
                  <option value="2">中式</option>
                  <option value="3">韓式</option>
                  <option value="4">泰式</option>
                  <option value="5">素食</option>
                  <option value="6">西式</option>
                  <option value="7">飲料店</option>
                  <option value="8">甜點店</option>
                  <option value="9">麵包店</option>
                </select>
              </div>
              <div className="row align-items-center">
                <label htmlFor="SalesTime" className="form-label fw-bold">
                  營業時間（24小時制）
                </label>
                <div className="col">
                  <input className="form-control" id="SalesTime" required />
                </div>
                ：
                <div className="col">
                  <input className="form-control" id="SalesTime" required />
                </div>
                ～
                <div className="col">
                  <input className="form-control" id="SalesTime" required />
                </div>
                ：
                <div className="col">
                  <input className="form-control" id="SalesTime" required />
                </div>
              </div>
              <div className="mt-3 d-flex align-items-end">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="flexCheckDefault"
                />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  我同意 平台業者服務條款
                </label>
              </div>
            </div>
            <div className="row px-3 pb-3">
              <button
                type="submit"
                className="btn sendApply text-light"
                onClick={handleSubmit}
              >
                送 出 申 請
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
