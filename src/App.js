import React, { Component } from "react";
import {
  ReactiveBase,
  SearchBox
} from "@appbaseio/reactivesearch";

import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="airbeds-test-app"
          url="https://0db089035140:beb6fd5e-03f6-4a26-a7e2-a57550ce3286@appbase-demo-ansible-abxiydt-arc.searchbase.io"
          enableAppbase
          type="listing"
          theme={{
            colors: {
              primaryColor: "#41ABF5"
            }
          }}
        >
          <div className="nav-container">
            <nav className="nav">
              <div className="title">Airbeds</div>
            </nav>
          </div>
          <div className="filters-search-container">
            <div className="search-container">
              <SearchBox
                componentId="search"
                dataField="name"
                autosuggest={false}
                placeholder="Search housings..."
                iconPosition="left"
                className="search"
              />
            </div>
          </div>
          <div className="result-map-container">
            <ReactiveGoogleMap
              componentId="map"
              dataField="location"
              defaultZoom={13}
              pagination
              onPageChange={() => {
                window.scrollTo(0, 0);
              }}
              style={{
                width: "calc(100% - 280px)",
                height: "calc(100vh - 52px)"
              }}
              className="rightCol"
              showMarkerClusters={false}
              showSearchAsMove={false}
              innerClass={{
                label: "label"
              }}
              renderAllData={(
                hits,
                streamHits,
                loadMore,
                renderMap,
                renderPagination
              ) => (
                <div style={{ display: "flex" }}>
                  <div>
                    <div className="card-container">
                      {hits.map(data => (
                        <div key={data._id} className="card">
                          <div
                            className="card__image"
                            style={{ backgroundImage: `url(${data.image})` }}
                            alt={data.name}
                          />
                          <div>
                            <h2>{data.name}</h2>
                            <div className="card__price">${data.price}</div>
                            <p className="card__info">
                              {data.room_type} · {data.accommodates} guests
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>{renderPagination()}</div>
                  </div>
                  <div className="map-container">{renderMap()}</div>
                </div>
              )}
              renderData={data => ({
                label: (
                  <div
                    className="marker"
                    style={{
                      width: 40,
                      display: "block",
                      textAlign: "center"
                    }}
                  >
                    <div className="extra-info">{data.name}</div>${data.price}
                  </div>
                )
              })}
              react={{
                and: ["GuestSensor", "PriceSensor", "DateRangeSensor", "search"]
              }}
            />
          </div>
        </ReactiveBase>
      </div>
    );
  }
}

export default App;