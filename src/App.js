import React, { Component } from "react";
import {
  ReactiveBase
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
          Hello from Reactive Search!
        </ReactiveBase>
      </div>
    );
  }
}

export default App;
