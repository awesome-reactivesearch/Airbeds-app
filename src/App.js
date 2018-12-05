import React, {Component} from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider
} from "@appbaseio/reactivesearch";
import {ReactiveMap} from "@appbaseio/reactivemaps";
import "./App.css";

class App extends Component {
  onPopoverClick = function(data) {
    return (
      <div className="popover">
        <div className="image-container">
          <img src={data.image} alt={data.name} height="185" width="263" />
        </div>
        <div className="extra-info-container">
          <div className="type-container info">
            {data.room_type}-{data.beds} bed
          </div>
          <div className="name-container info">{data.name}</div>
          <div className="price-container info">
            ${data.price} per night-Free cancellation
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="airbeds-test-app"
			    credentials="X8RsOu0Lp:9b4fe1a4-58c6-4089-a042-505d86d9da30"
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
            <div className="filter-container">
              <div className="dropdown">
                <button className="button">Price</button>
                <div className="dropdown-content">
                  <RangeSlider
                    componentId="PriceSensor"
                    dataField="price"
                    title="Price Range"
                    range={{
                      start: 10,
                      end: 250
                    }}
                    rangeLabels={{
                      start: "$10",
                      end: "$250"
                    }}
                    defaultSelected={{
                      start: 10,
                      end: 50
                    }}
                    stepValue={10}
                    interval={20}
                    react={{
                      and: ["DateRangeSensor", "GuestSensor"]
                    }}
                    className="rangeFilter"
                  />
                </div>
              </div>
              <div className="dropdown">
                <button className="button">Guests</button>
                <div className="dropdown-content-guest">
                  <NumberBox
                    componentId="GuestSensor"
                    dataField="accommodates"
                    title="Guests"
                    defaultSelected={2}
                    labelPosition="right"
                    data={{
                      start: 1,
                      end: 16
                    }}
                    className="numberFilter"
                  />
                </div>
              </div>

              <div className="dropdown">
                <button className="button ">When</button>
                <div className="dropdown-content">
                  <DateRange
                    dataField="date_from"
                    componentId="DateRangeSensor"
                    title="When"
                    numberOfMonths={2}
                    queryFormat="basic_date"
                    initialMonth={new Date("04/01/2017")}
                    className="dateFilter"
                  />
                </div>
              </div>
            </div>
            <div className="search-container">
              <DataSearch
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
            <ReactiveMap
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
              onPopoverClick={this.onPopoverClick}
              className="rightCol"
              showMarkerClusters={false}
              showSearchAsMove={false}
              innerClass={{
                label: "label"
              }}
              onAllData={(
                hits,
                streamHits,
                loadMore,
                renderMap,
                renderPagination
              ) => (
                <div style={{display: "flex"}}>
                  <div className="card-container">
                    {hits.map(data => (
                      <div key={data._id} className="card">
                        <div
                          className="card__image"
                          style={{backgroundImage: `url(${data.image})`}}
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
                    {renderPagination()}
                  </div>
                  <div className="map-container">{renderMap()}</div>
                </div>
              )}
              onData={data => ({
                label: (
                  <div
                    className="marker"
                    style={{
                      width: 40,
                      display: "block",
                      textAlign: "center"
                    }}
                  >
                    <div className="extra-info">{data.name}</div>
                    ${data.price}
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
