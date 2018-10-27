import React, { Component } from 'react';

export default class Place extends Component {
  render() {
    return(
      <li className="place" onClick={() => this.props.onPlaceClick(this.props)}>
        {this.props.name}
      </li>
    )
  }
}