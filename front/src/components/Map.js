//import React from 'react'
import * as React from 'react';
import {Component} from 'react';
//import {render} from 'react-dom';
import MapGL,{Marker} from 'react-map-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoidmliaGF2MjAyMCIsImEiOiJja2twYm1tb2gwYmE0MnZzMTJpZHR0OG9pIn0.58ZcNfKj2SB6TdZ-j9chxA';

//import React, { Component } from 'react'

export default class Map extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            viewport: {
              latitude: 19.076090,
              longitude:  72.877426,
              zoom: 10,
              bearing: 0,
              pitch: 0
            },
            userLocation:{
                lat:19.076090,
                long:72.877426
            }
          };
        }
        setUserLocation = () =>
        {let {latitude,longitude} = this.props
        latitude = parseFloat(latitude)
        longitude = parseFloat(longitude)
        let setUserLocation = {
            lat:latitude,
            long:longitude
        };
        let newViewport = {
            height:"50vh",
            width:"50vw",
            latitude:latitude,
            longitude:longitude,
            zoom:10
        };
        this.setState({viewport:newViewport,
        userLocation:setUserLocation});
        console.log(this.state)
            
        }
componentDidMount(){
    this.setUserLocation();
    console.log(this.state)
}
    
    render() {
        
        return (
            <MapGL 
              {...this.state.viewport}
              width="50vw"
              height="50vh"
              mapStyle="mapbox://styles/mapbox/dark-v9"
              onViewportChange={viewport => this.setState({viewport})}
              mapboxApiAccessToken={MAPBOX_TOKEN}
            >
            {Object.keys(this.state.userLocation).length !==0 ?(
            <Marker 
            latitude={this.state.userLocation.lat} 
            longitude = {this.state.userLocation.long}><div>I'm here!!</div>
            </Marker>):(
                <div>Empty</div>
            )}
            
            </MapGL>
          );
}
}

/*import * as React from 'react';
import {Component} from 'react';
import {render} from 'react-dom';
import MapGL from 'react-map-gl';

const MAPBOX_TOKEN = ''; // Set your mapbox token here

class Root extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 37.8,
        longitude: -122.4,
        zoom: 14,
        bearing: 0,
        pitch: 0
      }
    };
  }

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        width="100vw"
        height="100vh"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={viewport => this.setState({viewport})}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      />
    );
  }
} */