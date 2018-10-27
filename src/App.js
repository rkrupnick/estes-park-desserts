import React, { Component } from 'react';
import Map from './Components/Map';
import './App.css';
import SquareAPI from './API/';

class App extends Component {
  constructor() {
    super();
    this.state = {
      venues: [],
      markers: [],
      mapCenter: [],
      zoom: 16,
    };
  }

  hideAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.infoWindowIsOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };

  onMarkerClick = (marker) => {
    this.hideAllInfoWindows();
    marker.infoWindowIsOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});
    console.log(marker);
  };

  componentDidMount() {
    SquareAPI.search({
      near: 'Estes Park, CO',
      query: 'art',
      limit: 10,
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          infoWindowIsOpen: false,
          markerIsVisible: true,
        };
      });
      this.setState({ venues, center, markers });
      //console.log(results);
    });
  }


  render() {
    return (
      <div className="App">
        <Map { ...this.state } onMarkerClick={this.onMarkerClick}/>
      </div>
    );
  }
}

export default App;
