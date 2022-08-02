import React from "react";
import { ReactComponent as Subtract } from "../images/Subtract.svg";
// -------- React Icon --------


const MapPin = ({ text }) => {
  return (
    <div>
      <div className="map-pin">
        <div className="map-container">
          <div className="map-pin-icon">
            <Subtract />
          </div>
          <div className="map-pin-name">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default MapPin;
