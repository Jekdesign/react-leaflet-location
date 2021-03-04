import React from "react";
import './App.css';
import { Map, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
//import * as parkData from './data/location.json'
import * as parkData from './data/location2.json'

function App() {
  const [activePark, setActivePark] = React.useState(null);

  return (
    <MapContainer center={[51, 5]} zoom={5}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkData.features.map(park => (
        <Marker
          key={park.properties.PARK_ID}
          position={[
            park.geometry.coordinates[1],
            park.geometry.coordinates[0]
          ]}
        >
        <Popup >
          <div>
            <h2>{park.properties.NAME}</h2>
            <p>{park.properties.DESCRIPTIO}</p>
          </div>
        </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
