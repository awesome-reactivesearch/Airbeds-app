import React, {Component} from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider
} from "@appbaseio/reactivesearch";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <ReactiveBase
          app="housing"
          credentials="0aL1X5Vts:1ee67be1-9195-4f4b-bd4f-a91cd1b5e4b5"
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
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
