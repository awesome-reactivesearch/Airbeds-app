import React, { Component } from "react";
import {
  RangeSlider,
  ReactiveBase,
  SearchBox,
  NumberBox
} from "@appbaseio/reactivesearch";


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
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
