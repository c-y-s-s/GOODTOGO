import React from "react";

// -------- React Icon --------
import { FiMapPin } from "react-icons/fi";

const MapPin = ({ text }) => {
  return (
    <div>
      <div className="map-pin">
        <div className="map-container">
          <div className="map-pin-icon">
            <FiMapPin/>
          </div>
          <div className="map-pin-name">{text}</div>
        </div>
      </div>
    </div>
  );
};

export default MapPin;
