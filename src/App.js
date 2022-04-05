import React, { Component } from "react";
import {
  ReactiveBase,
  SearchBox
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
        </ReactiveBase>
      </div>
    );
  }
}

export default App;