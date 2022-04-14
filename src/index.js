import React from 'react';
import {createRoot} from 'react-dom/client';
import { ReactiveBase, SearchBox } from '@appbaseio/reactivesearch';
import { ReactiveGoogleMap } from '@appbaseio/reactivemaps';

const App = ()=> {
    return (
      <div className="main-container">
        {/* Component that connects backend */}
        <ReactiveBase
          app="clone-airbeds"
          url="https://73afb5484d0e:26bd5cb0-1afc-4e19-8870-4a2eda8d0b56@appbase-demo-ansible-abxiydt-arc.searchbase.io"
          mapKey='AIzaSyCqWUHFYNXCMlt13StFZzim5y06Yr99vRY'
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
          <div className="result-map-container">
            {/* Show a google map locating hotels */}
            <ReactiveGoogleMap
              componentId="map"
              dataField="location"
              defaultZoom={13}
              pagination
              onPageChange={() => {
                window.scrollTo(0, 0);
              }}
              libraries={["places"]}
              style={{
                width: "100%",
                height: "100%"
              }}
              className="rightCol"
              showMarkerClusters={false}
              showSearchAsMove
              innerClass={{
                label: "label"
              }}
              render={({
                data: hits,
                renderMap,
                renderPagination,
                meta
              }) => (
                <div>
                  <div className="total-results">Found {meta.resultStats.numberOfResults} results in {meta.resultStats.time}ms</div>
                <div className="card-map-container">
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
                  <div style={{width:500, height: 500}} className="map-container">{renderMap()}</div>
                </div>
                </div>
              )}
              renderItem={data => ({
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App tab="home" />);