import React from "react";
import { ReactComponent as Pin } from "../images/pin_map.svg";

const LocationPin = ({ text }) => {
  return (
    <div className="pin">
      <Pin className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  );
};

export default LocationPin;
