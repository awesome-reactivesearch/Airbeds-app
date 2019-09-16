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
                                defaultValue={{
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
    );
  }
}

export default App;
