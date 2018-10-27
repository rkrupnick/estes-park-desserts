import React, { Component } from 'react';
import Map from './Components/Map';
import './App.css';
import SquareAPI from './API/';

class App extends Component {
  componentDidMount() {
    SquareAPI.search({
      near: 'Estes Park, CO',
      query: 'candy',
      limit: 10,
    }).then(results => console.log(results));
  }


  render() {
    return (
      <div className="App">
        <Map />
      </div>
    );
  }
}

export default App;
