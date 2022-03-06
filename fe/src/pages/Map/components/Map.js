import GoogleMapReact from "google-map-react";
import React from "react";
import LocationPin from "./LocationPin";

const Map = ({ storeLIst, zoomLevel }) => {
  const location = {
    address: "320桃園市中壢區新生路二段421號",
    lat: 24.985128,
    lng: 121.221719,
  };
  const location2 = {
    address: "421號",
    lat: 23.98513,
    lng: 121.221718,
  };
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
          >
            {/* {storeLIst.map(()=>{return()})} */}
            <LocationPin
              className="location-pin"
              lat={location.lat}
              lng={location.lng}
              text={location.address}
            />
            <LocationPin
              lat={location2.lat}
              lng={location2.lng}
              text={location2.address}
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default Map;
