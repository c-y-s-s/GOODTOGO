import React, { Component } from 'react';
import GoogleMapReact from "google-map-react";

// google map wrapper
// import { Wrapper, Status } from "@googlemaps/react-wrapper";

//地圖CSS, 備用
// import "./map.css";

// remember to input the .env.GOOGLE_API_KEY

//地圖圖標
const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 25.0439355,
      lng: 121.503584
    },
    zoom: 15
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key:  }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={25.0439355}
            lng={121.503584}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

//待處理 前端往後端請求 再由後端往map api打請求

// const Map: React.FC<{}> = () => {};
// function Map() {
//   return <>
//     <head>
//       <title>Simple Map</title>
//       <meta name="viewport" content="initial-scale=1.0"/>
//         <meta charset="utf-8"/>
//         </head>
//         <body>
//           <div id="map"></div>
//           <script>
//             var map;
//             function initMap() {
//               map = new google.maps.Map(document.getElementById('map'), {
//                 center: { lat: -34.397, lng: 150.644 },
//                 zoom: 8
//               })}
//           </script>
//           <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
//             async defer></script>
//         </body>
//       </>
// };


// App
function Map() {
  return (
    <div className="App">
      <SimpleMap />
    </div>
  );
}

      export default Map;