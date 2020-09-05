import React, { Component } from 'react';
import './App.css';

import API from './router/API';

class App extends Component {

  state = {
    burgers: [],
    table: [],
  }

  // needs to be moved to constructor?
  componentDidMount() {
    this.callTable("burger")
  };

  async callTable(tableName) {
    let sql = await API.table(tableName)
    if (tableName === "burger") {
      this.setState({ burgers: sql.data })
    } else {
      this.setState({ table: sql.data })
    }
    console.log(this.state)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="d-flex justify-content-around p-2">
            <button onClick={() => this.callTable("burger")}>Burgers</button>
            <button onClick={() => this.callTable("meat")}>Meats</button>
            <button onClick={() => this.callTable("cheese")}>Cheeses</button>
            <button onClick={() => this.callTable("condiment")}>Condiments</button>
            <button onClick={() => this.callTable("vegetable")}>Vegetables</button>
          </div>

          <ul className="list-group">
            {this.state.burgers.map((item) =>
              <li className="list-group-item list-group-item-action d-flex bd-highlight"
               key={item.id}>
                <span className="flex-grow-1 text-dark">Name:{item.name}</span>
                <button type="button" class="btn btn-primary">Edit</button>
                <button type="button" class="btn btn-danger">Delete</button>
              </li>
            )}
          </ul>
        </header>

      </div>
    );
  }
}

export default App;