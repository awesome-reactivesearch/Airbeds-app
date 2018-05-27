import React, {Component} from "react";
import {
  ReactiveBase,
  DataSearch,
  NumberBox,
  DateRange,
  RangeSlider
} from "@appbaseio/reactivesearch";

class App extends Component {
  render() {
    return (
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
        <DataSearch
          componentId="search"
          dataField="name"
          autosuggest={false}
          placeholder="Search housings..."
          iconPosition="left"
          className="search"
        />
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
        <DateRange
          dataField="date_from"
          componentId="DateRangeSensor"
          title="When"
          numberOfMonths={2}
          queryFormat="basic_date"
          initialMonth={new Date("04/01/2017")}
          className="dateFilter"
        />
      </ReactiveBase>
    );
  }
}

export default App;
