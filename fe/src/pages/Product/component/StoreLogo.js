import React from 'react';

const StoreLogo = ({logo}) => {
  return (
    <div>
      <div class="container-fluid p-0">
        <div class="storeLogo">
          <img
            class="w-100 storeLogoImg"
            src={require(`../../../images/store_img/${logo}`)}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default StoreLogo;
