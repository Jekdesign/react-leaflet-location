import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import { MapContainer, Marker, Popup, Tooltip, TileLayer } from "react-leaflet";
import axios from "axios";
import { Tabs } from "antd";

const { TabPane } = Tabs;
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      coordonates: [],
      locationData: [],
      locationTypeData: [],
      organizationGroupData: [],
      addressData: []
    };
  }

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
        this.setState({ locationTypeData: locationData.locationType });
        this.setState({ organizationGroupData: locationData.organizationGroup });
        this.setState({ addressData: locationData.address });
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
              <div className="card-container">
                <Tabs type="card">
                  <TabPane tab="Tab 1" key="1">
                    <p>{this.state.locationData.name}</p>
                    <p>{this.state.locationData.name}</p>
                    <p>{this.state.locationData.code}</p>
                    <p>{this.state.locationData.status}</p>
                    <p>{this.state.locationTypeData.name}</p>
                    <p>{this.state.locationData.locationOccupancy}</p>
                    <p>{this.state.organizationGroupData.name}</p>
                    <p>{this.state.organizationGroupData.reference}</p>
                  </TabPane>
                  <TabPane tab="Address" key="2">
                    <p>{this.state.addressData.formatted}</p>
                  </TabPane>
                  <TabPane tab="Tab Title 3" key="3">
                    <p>
                      totalContractualArea :{" "}
                      {this.state.locationData.totalContractualArea}
                    </p>
                    <p>
                      totalSubletArea :{" "}
                      {this.state.locationData.totalSubletArea}
                    </p>
                    <p>
                      remainingContractualArea :{" "}
                      {this.state.locationData.remainingContractualArea}
                    </p>
                    <p>
                      effectiveAreaAvailable :{" "}
                      {this.state.locationData.effectiveAreaAvailable}
                    </p>
                    <p>nbDeskMax : {this.state.locationData.nbDeskMax}</p>
                    <p>
                      ratioEffectiveAreaNbDeskMax :{" "}
                      {this.state.locationData.ratioEffectiveAreaNbDeskMax}
                    </p>
                    <p>
                      nbDeskInstalled :{" "}
                      {this.state.locationData.nbDeskInstalled}
                    </p>
                    <p>
                      ratioEffectiveAreaNbDeskInstalled :{" "}
                      {
                        this.state.locationData
                          .ratioEffectiveAreaNbDeskInstalled
                      }
                    </p>
                    <p>nbDeskUsed : {this.state.locationData.nbDeskUsed}</p>
                    <p>
                      ratioEffectiveAreaNbDeskUsed :{" "}
                      {this.state.locationData.ratioEffectiveAreaNbDeskUsed}
                    </p>
                    <p>nbPerson : {this.state.locationData.nbPerson}</p>
                    <p>
                      ratioEffectiveAreaNbPerson :{" "}
                      {this.state.locationData.ratioEffectiveAreaNbPerson}
                    </p>
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
