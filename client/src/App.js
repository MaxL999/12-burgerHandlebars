import React, { Component } from 'react';
import './App.css';

import BurgerTable from './BurgerTable';
import ExtrasTable from './ExtrasTable';

import API from './router/API';

class App extends Component {

  state = {
    tableType: 1,
    table: [],
  }

  // needs to be moved to constructor?
  componentDidMount() {
    this.callTable("burger")
  };

  async callTable(tableName) {
    let sql = await API.table(tableName)
    this.setState({ table: sql.data, tableType: tableName })
  }

  // will expand
  renderTable(table) {
    switch (table) {
      case 'burger':
        return <BurgerTable table={this.state.table} />;

      default:
        return <ExtrasTable table={this.state.table} />

    }
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
            {/* button to reseed MYSQL if someone edits incorrectly */}
            {/* <button onClick={}>Reset Database</button> */}
          </div>

          <div>
            {this.renderTable(this.state.tableType)}
          </div>

        </header>

      </div>
    );
  }
}

export default App;