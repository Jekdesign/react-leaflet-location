import React from "react";
import "./App.css";
import { MapContainer, Marker, Popup, Tooltip, TileLayer } from "react-leaflet";
import axios from "axios";
import { Tabs } from "antd";

const { TabPane } = Tabs;
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
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="Tab Title 1" key="1">
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                    <p>Content of Tab Pane 1</p>
                  </TabPane>
                  <TabPane tab="Tab Title 2" key="2">
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                    <p>Content of Tab Pane 2</p>
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="3">
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                    <p>Content of Tab Pane 3</p>
                  </TabPane>
                </Tabs>
              </div>
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
