import React from "react";
import "./App.css";
import { MapContainer, Marker, Popup, Tooltip, TileLayer } from "react-leaflet";
import axios from "axios";
import { Tabs } from "antd";
class App extends React.Component {
  state = {
    coordonates: [],
    locationData: [],
  };

  componentDidMount() {
    const url = "http://ms-location.local/v1/location/coordonates";
    axios
      .get(url)
      .then((response) => {
        const coordonates = response.data._embedded;
        this.setState({ coordonates });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getLocationData(uuid) {
    const url2 = `http://ms-location.local/v1/location/${uuid}`;
    axios
      .get(url2)
      .then((response) => {
        const locationData = response.data._item;
        this.setState({ locationData });
        console.log(locationData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <MapContainer center={[51, 5]} zoom={5}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {this.state.coordonates.map((park) => (
          <Marker
            key={park.uuid}
            position={[park.address.lat, park.address.lng]}
            eventHandlers={{
              click: () => {
                this.getLocationData(park.uuid);
              },
            }}
          >
            <Popup>
              <p>{this.state.locationData.name}</p>
            </Popup>

            <Tooltip>
              <div>
                <h2>{park.name}</h2>
                <p>{park.address.formatted}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    );
  }
}

export default App;
