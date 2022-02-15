import React, { Component, useState } from 'react';

import GoogleMapReact from "google-map-react";

import '../MapStyle.scss';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Map = () => {

    const isMobile = useMediaQuery('(min-width:300px)');
    const coordinates = { lat: 23.5, lng: 121 };
    const [opened, setOpened] = useState("opened");
    const [type, setType] = useState("type1");
    const [where, setWhere] = useState("chung-li");
    const stores = useState('2');
    ;
    return (
        <>
            <div className="container-fluid">
                <div className="container .d-none .d-sm-block .d-md-none" style="width: 120px">

                </div>
                    <div className="row">
                    <div className="col-lg-9 m-0 p-0 mapContainer">
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
                    <div className="col-lg-3 m-0 p-0">


                    </div>

                </div>
            </div>
        </>
    );
}



