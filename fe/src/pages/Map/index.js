import React, { Component, useState } from 'react';
import GoogleMapReact from "google-map-react";
import { CircularProgress, Select, InputLabel, MenuItem, FormControl, CssBaseline, Grid, Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import './MapStyle.scss';


const AnyReactComponent = ({ text }) => <div>{text}</div>;

// -------- Map功能開始 --------//

const Map = () => {
  //-------- classes管理功能 --------//
  // const classes = [];
  //-------- classes管理功能 --------//

  const isMobile = useMediaQuery('(min-width:300px)');
  const coordinates = { lat: 0, lng: 0 };
  const [opened, setOpened] = useState("opened");
  const [type, setType] = useState("type1");
  const [where, setWhere] = useState("chung-li");


  return (
    <>
      <CssBaseline />
      {/* -------- 地圖區塊開始 -------- */}
      <Grid className="mapList" container spacing={3} style={{ width: '100%' }}>
        <Grid item xs={12} md={9}>
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
        </Grid>
        {/* -------- 地圖區塊結束 -------- */}

        {/* -------- 清單區塊開始 -------- */}
        <Grid item xs={12} md={3}>
          <div className="mapList">
            <Typography variant="h4" align="center">
              搜尋附近店家

            </Typography>
            <FormControl fullWidth className="formControl">
              <Select className="selector" disableUnderline align="center" value={opened} onChange={(e) => setOpened(e.target.value)}>
                <MenuItem value="opened">營業中店家</MenuItem>
                <MenuItem value="closed">全部</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth className="formControl">
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

              
            </Grid>
            </div>
        </Grid>
        {/* -------- 清單區塊結束 -------- */}
      </Grid>
    </>
  );
}

// --------Map元件導出-------- //
export default Map;