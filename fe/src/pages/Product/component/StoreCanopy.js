import React from "react";
// -------- uuid --------
import { v4 as uuidv4 } from "uuid";
const StoreCanopy = ({ canopy }) => {
  return ( 
    <div>
      <div className="canopy">
        <ul className="d-flex">
          {canopy.map(() => {
            return <li key={uuidv4()}></li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default StoreCanopy;
