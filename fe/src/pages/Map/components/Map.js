import GoogleMapReact from "google-map-react";
import React from "react";
import LocationPin from "./LocationPin";

const Map = (props) => {
  const { displayStoreList, zoomLevel } = props;
  //!渲染是靠location
  //!LocationPin 必需要有相對應的location才能渲染出東西
  //!也就是說必需先整理出需要的location 陣列
  //!然後利用去map這個陣列然後 裡面map LocationPin


  // 先把得到的資料塞進一個空陣列裡
  const locationArr = []
  displayStoreList.forEach((i)=>{

    locationArr.push({
      //storeId在右邊顯示小卡片可能會用到
      // storeID:i.id,
      name:i.name,
      lng: i.lat,
      lat: i.lng,
    });
  })

  const location = {
    address: "320桃園市中壢區新生路二段421號",
    lat: 24.985128,
    lng: 121.221719,
  };
  // const location2 = {
  //   address: "101",
  //   lat: 25.033964,
  //   lng: 121.564468,
  // };
  // console.log(displayStoreList, "lsit");
  return (
    <>
      <div className="map">
        {/* <h2 className="map-current-location">你在這</h2> */}
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: process.env.API_KEY,
            }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
            resetBoundsOnResize="true"
          >
            {/* {storeLIst.map(()=>{return()})} */}
            {/* 使用者位置，預設學校 */}
            <LocationPin
              className="location-pin"
              lat={location.lat}
              lng={location.lng}
              text={location.name}
            />
    
            {/* // !用傳進來的資料map,只是為了得到他的index長度,實際上裡面的資料是用上面處理好的 */}
            {displayStoreList.map((item,index)=>{
              return (
                <LocationPin
                  storeId={item.id}
                  className="location-pin"
                  lat={locationArr[index].lat}
                  lng={locationArr[index].lng}
                  name={locationArr[index].name}
                  setClickStoreId={props.setClickStoreId}
                />
              );
    
            })}
    

            {/* <LocationPin
              className="location-pin"
              lat={location2.lat}
              lng={location2.lng}
            /> */}

            {/* {displayStoreList.map((store) => {
     
              return (
                <>
                  <div key={store.id}>
                    <LocationPin
                      className="location-pin"
                      lat={locationArr.map((i)=>{
                        console.log("iiiiii",i.lat)
                        return i.lat;
                      })}
                      lng={locationArr.map((i)=>{
                        console.log("ggggggggg", i.lng);
                        return i.lng
                      })}
                      text={store.name}
                    />
                  </div>
                </>
              );
            })} */}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default Map;
