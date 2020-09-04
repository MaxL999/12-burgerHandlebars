import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import API from './router/API';

class App extends Component {

  state = {
    table: []
  }

  // needs to be moved to constructor?
  async componentDidMount() {
    let data = await API.table("burger")
    this.setState({ table: data.data })
  };


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <button onClick={() => {
            API.table("burger").then((res) => console.log(res))
          }}>Click</button>
        </header>
        <ul>
          {this.state.table.map((item) => <li>Name:{item.name} Eaten:{item.eaten ? "True" : "False"}</li>)}
        </ul>
      </div>
    );
  }
}

export default App;