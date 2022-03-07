import React from "react";

const Headings = () => {
  return (
    <div>
      <div className="d-flex justify-content-center">
        <div className="headings-bottom-line">
          <h3>
            <img
              src={require(`../images/Vector.png`)}
              alt="..."
              className="me-2 mb-2"
            />
            優惠卷
            <img
              src={require(`../images/Vector.png`)}
              alt="..."
              className="ms-2 mb-2"
            />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Headings;
