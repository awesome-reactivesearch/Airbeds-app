import React from 'react';
import {createRoot} from 'react-dom/client';
import { ReactiveBase, SearchBox } from '@appbaseio/reactivesearch';

const App = ()=> {
    return (
      <div className="main-container">
        {/* Component that connects backend */}
        <ReactiveBase
          app="clone-airbeds"
          url="https://73afb5484d0e:26bd5cb0-1afc-4e19-8870-4a2eda8d0b56@appbase-demo-ansible-abxiydt-arc.searchbase.io"
          enableAppbase
          theme={{
            colors: {
              primaryColor: "#41ABF5"
            }
          }}
        >
          <div className="search-container">
              {/* Search hotels by name */}
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);