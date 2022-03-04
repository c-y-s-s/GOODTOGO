import GoogleMapReact from "google-map-react";
import React from "react";
import LocationPin from "./LocationPin";

const Map = ({ location, zoomLevel }) => {
  // const location = {
  //   address: "1600 Amphitheatre Parkway, Mountain View, california.",
  //   lat: 37.42216,
  //   lng: -122.08427,
  // };
  return (
    <>
      <div className="map">
        {/* <h2 className="map-current-location">你在這</h2> */}
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyB8b_aSja4ghiPUK-b53JEjxG-eczkt6FU",
            }}
            defaultCenter={location}
            defaultZoom={zoomLevel}
          >
            <LocationPin
              lat={location.lat}
              lng={location.lng}
              text={location.address}
            />
          </GoogleMapReact>
        </div>
      </div>
    </>
  );
};

export default Map;
