import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import LocationPin from "./LocationPin";
import CurrentLocationPin from "./CurrentLocationPin";
import { MdOutlineEmojiPeople } from "react-icons/md";
// import { LARGE_MAP_KEY } from "../../../key";

const Map = (props) => {
  const { displayStoreList, zoomLevel } = props;
  const [currentLat, setCurrentLat] = useState("");
  const [currentLng, setCurrentLng] = useState("");
  //!渲染是靠location
  //!LocationPin 必需要有相對應的location才能渲染出東西
  //!也就是說必需先整理出需要的location 陣列
  //!然後利用去map這個陣列然後 裡面map LocationPin

  const here = navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    setCurrentLat(position.coords.latitude);
    setCurrentLng(position.coords.longitude);
  });

  console.log("clng", currentLng, "clat", currentLat);
  // 先把得到的資料塞進一個空陣列裡
  const locationArr = [];
  displayStoreList.forEach((i) => {
    locationArr.push({
      //storeId在右邊顯示小卡片可能會用到
      // storeID:i.id,
      lng: i.lat,
      lat: i.lng,
      name: i.name.split(" ")[0],
      open_time: i.open_time,
      close_time: i.close_time,
      amount: i.amount,
    });
  });
  console.log("sss", displayStoreList);
  const location = {
    // address: "320桃園市中壢區新生路二段421號",
    lat: currentLat,
    lng: currentLng,
  };

  return (
    <>
      <div className="map">
        {/* <h2 className="map-current-location">你在這</h2> */}
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              // key: LARGE_MAP_KEY,
            }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
          >
            {/* 使用者位置，預設學校 */}
            <CurrentLocationPin
              className="location-pin"
              lat={currentLat}
              lng={currentLng}
              name={location.name}
            />

            {/* // !用傳進來的資料map,只是為了得到他的index長度,實際上裡面的資料是用上面處理好的 */}
            {displayStoreList.map((item, index) => {
              return (
                <LocationPin
                  storeId={item.id}
                  className="location-pin"
                  lat={locationArr[index].lat}
                  lng={locationArr[index].lng}
                  name={locationArr[index].name}
                  open_time={locationArr[index].open_time}
                  close_time={locationArr[index].close_time}
                  amount={locationArr[index].amount}
                  setClickStoreId={props.setClickStoreId}
                />
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default Map;
