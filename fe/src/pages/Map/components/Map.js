import GoogleMapReact from "google-map-react";
import React from "react";
import LocationPin from "./LocationPin";

const Map = (props) => {
  const { displayStoreList, zoomLevel } = props;
  const location = {
    address: "320桃園市中壢區新生路二段421號",
    lat: 24.985128,
    lng: 121.221719,
  };
  const location2 = {
    address: "101",
    lat: 25.033964,
    lng: 121.564468,
  };
  console.log(displayStoreList, "lsit");
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
            <LocationPin
              className="location-pin"
              lat={location2.lat}
              lng={location2.lng}
            />
            {displayStoreList.map((store) => {
              return (
                <>
                  <div key={store.id}>
                    <LocationPin
                      className="location-pin"
                      lat={store.lat}
                      lng={store.lng}
                      text={store.name}
                    />
                  </div>
                </>
              );
            })}
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default Map;
