import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../utils/config";
import "./myAccount.scss";

const MyAccount = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // http://localhost:3002/api/users
    let getUser = async () => {
      let response = await axios.get(`${API_URL}/users`);
      // response 是物件
      setData(response.data);
    };
    getUser();
  }, []);

  return (
    // <div>
    //   {data.map((users) => {
    //     return <div>{users.name}</div>;
    //   })}
    // </div>

    <div>
      {/* <div className="font">test 這樣成功嗎</div> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="leftMenu">
              <div className="headShot"></div>
              <p>王xx</p>
            </div>
          </div>
          <div className="col-lg-10">456</div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
