import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import API from './router/API';

class App extends Component {

  state = {
    posts: []
  }

  componentDidMount() {
    API.test()
  }


  render() {


    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={API.test}>Click</button>
        </header>
      </div>
    );
  }
}

export default App;
