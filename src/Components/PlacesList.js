import React, { Component } from 'react';
import Place from './Place';

export default class PlacesList extends Component {
  render() {
    return(
      <ol className="places-list">
        {this.props.venues && this.props.venues.map((venue, idx) =>
          <Place key={idx} {...venue} onPlaceClick={this.props.onPlaceClick} />)}
      </ol>
    )
  }
}