import React, { Component } from 'react';
import PlacesList from './PlacesList';

export default class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
      venues: [],
    };
  }

  filterVenues = () => {
    if (this.state.query.trim() !== '') {
      const venues = this.props.venues.filter(venue => venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase()))
       return venues;
    } return this.props.venues;
  };

  handleChange = event => {
    this.setState({ query: event.target.value });
    const markers = this.props.venues.map(venue => {
      const isAMatch = venue.name.toLowerCase().includes(event.target.value.toLowerCase());
      const marker = this.props.markers.find(marker => marker.id === venue.id);
      if (isAMatch) {
        marker.markerIsVisible = true;
      } else {
        marker.markerIsVisible = false;
      }
      return marker;
    });
    this.props.updateSuperState({ markers });
  };

  render() {
    return(
      <div className="sidebar">
        <input
          type={"search"}
          id={"search"}
          placeholder={"Filter Places"}
          onChange={this.handleChange}
          />
        <PlacesList
          {...this.props}
          venues={this.filterVenues()}
          onPlaceClick={this.props.onPlaceClick}
        />
      </div>
    )
  }
}