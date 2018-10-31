import React, { Component } from 'react';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';
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
      infoWindowPhotoSrc: '',
      loadingError: false,
      updateSuperState: obj => {
        this.setState(obj);
      }
    };
  }



  hideAllInfoWindows = () => {
    const markers = this.state.markers.map(marker => {
      marker.infoWindowIsOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)});
  };

  onPlaceClick = (venue) => {
    const marker = this.state.markers.find(marker => marker.id === venue.id);
    this.onMarkerClick(marker);
  };


  onMarkerClick = (marker) => {
    this.hideAllInfoWindows();
    marker.infoWindowIsOpen = true;
    this.setState({markers: Object.assign(this.state.markers, marker)});

    const venue = this.state.venues.find(venue => venue.id === marker.id);

    SquareAPI.getVenueDetails(marker.id).then(results => {
      const newVenue = Object.assign(results.response.venue, venue);
        this.setState({ venues: Object.assign(this.state.venues, newVenue)})
    }).catch(error => {
      console.log(error);
    });

    SquareAPI.getVenuePhotos(venue.id).then(result => {
      const photoURL = result.response.photos.items[0].prefix + '200x200'
        + result.response.photos.items[0].suffix;
      this.setState({ infoWindowPhotoSrc: photoURL });
    }).catch(error => {
      this.setState({ infoWindowPhotoSrc: '' });
    })
  };

  componentDidMount() {
    SquareAPI.search({
      near: 'Estes Park, CO',
      categoryId: '4bf58dd8d48988d1d0941735',
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
          id: venue.id,
        };
      });
      this.setState({ venues, center, markers });
      this.setState({ loadingError: false });
    }).catch(error => {
      this.setState({ loadingError: true });
      console.log(error);
    });
  }


  render() {
    return (
      <div className="main">
        <h1>Estes Park Dessert Shops</h1>

          {this.state.loadingError &&
            <p className="error">We are having trouble loading the data. Please try again later</p>
          }

          {!this.state.loadingError &&
            <div className="App">
              <Sidebar { ...this.state } onPlaceClick={this.onPlaceClick} updateQuery={this.updateQuery}/>
              <Map { ...this.state } onMarkerClick={this.onMarkerClick} />
            </div>
          }

      </div>
    );
  }
}

export default App;
