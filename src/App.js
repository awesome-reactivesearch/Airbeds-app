import React, { Component } from "react";
import {
  ReactiveBase,
  SearchBox,
  NumberBox,
  DateRange,
  RangeInput,
  SelectedFilters
} from "@appbaseio/reactivesearch";

import './App.css'
import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";

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
          app="clone-airbeds"
          url="https://73afb5484d0e:26bd5cb0-1afc-4e19-8870-4a2eda8d0b56@appbase-demo-ansible-abxiydt-arc.searchbase.io"
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
            <div className="filter-container">
              <div className="dropdown">
                <button className="button">Price</button>
                <div className="dropdown-content">
                  <RangeInput
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
                    defaultValue={{
                      start: 10,
                      end: 50
                    }}
                    stepValue={10}
                    interval={20}
                    react={{
                      and: ["DateRangeSensor", "GuestSensor"]
                    }}
                    showHistogram={false}
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
                    defaultValue={2}
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
              <SearchBox
                componentId="search"
                dataField="name"
                autosuggest={false}
                placeholder="Search housings..."
                iconPosition="left"
                className="search"
              />
            </div>
            <div className="selected-container">
              <SelectedFilters/>
            </div>
          </div>
          <div className="result-map-container">
            <ReactiveGoogleMap
              componentId="map"
              dataField="location"
              defaultZoom={13}
              pagination
              onPopoverClick={this.onPopoverClick}
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
