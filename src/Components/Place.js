import React, { Component } from 'react';

export default class Place extends Component {
  render() {
    return(
      <li className="place" onClick={() => this.props.onPlaceClick(this.props)}>
        <img
          src={
            this.props.categories[0].icon.prefix +
            '32' +
            this.props.categories[0].icon.suffix
          } alt={this.props.categories[0].name}/>
        {this.props.name}
      </li>
    )
  }
}