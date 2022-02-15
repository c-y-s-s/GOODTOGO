import React, { Component, useState } from 'react';
import GoogleMapReact from "google-map-react";
import './MapStyle.scss';
// import PlaceDetails from './components/PlaceDetails';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

// -------- Map功能開始 --------//

const Map = () => {
  //-------- classes管理功能 --------//
  // const classes = [];
  //-------- classes管理功能 --------//

  const isMobile = useMediaQuery('(min-width:300px)');
  const coordinates = { lat: 23.5, lng: 121 };
  const [opened, setOpened] = useState("opened");
  const [type, setType] = useState("type1");
  const [where, setWhere] = useState("chung-li");
  const stores = useState('2');
  ;

  return (
    <>
      {/* -------- 地圖區塊開始 -------- */}
      <div className="container-fluid vh-75" >
        <div>
          <div className="mapContainer" >
            <GoogleMapReact
              //最後記得把KEY放進環境變數
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_API_KEY }}
              defaultCenter={coordinates}
              center={coordinates}
              defaultZoom={13}
              margin={[0, 0, 0, 0]}
              options={""}
              onChange={""}
              onChildClick={""}
            >
            </GoogleMapReact>
          </div>
        </div>
        {/* -------- 地圖區塊結束 -------- */}

        {/* -------- 清單區塊開始 -------- */}
        <Grid item xs={12} md={3}>
          <div className="mapList">
            <h4 align="center">
              搜尋附近店家
            </h4>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                營業中店家
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>
            {/* <FormControl fullWidth className="formControl">
              <Select className="selector" disableUnderline align="center" value={type} onChange={(e) => setType(e.target.value)}>
                <MenuItem value="type1">種類1</MenuItem>
                <MenuItem value="type2">種類2</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className="formControl">
              <Select className="selector" disableUnderline align="center" value={where} onChange={(e) => setWhere(e.target.value)}>
                <MenuItem value="chung-li">中壢區</MenuItem>
                <MenuItem value="ping-jun">平鎮區</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={3} className="list">
              {stores?.map((store, i) =>
                <Grid item key={i} xs={12}>
                  <storeDetails place={'1'} />
                </Grid>
              )}
            </Grid> */}
          </div>
        </Grid>
        {/* -------- 清單區塊結束 -------- */}
      </div>
    </>
  );
}

// --------Map元件導出-------- //
export default Map;