import React, { Component } from 'react';
import PlacesList from './PlacesList';

export default class Sidebar extends Component {
  render() {
    return(
      <div className="sidebar">
        <input type={"search"} id={"search"} placeholder={"Filter Places"} />
        <PlacesList {...this.props} onPlaceClick={this.props.onPlaceClick}/>
      </div>
    )
  }
}