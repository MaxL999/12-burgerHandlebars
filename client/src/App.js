import React, { Component } from 'react';
import './App.css';

import BurgerTable from './BurgerTable';
import ExtrasTable from './ExtrasTable';

import API from './router/API';

class App extends Component {

  state = {
    burgers: [],
    ingredients: []
  }

  // needs to be moved to constructor?
  async componentDidMount() {
    let burger = await API.table("burger")
    let ingredient = await API.table("ingredients")
    this.setState({ burgers: burger.data, ingredients: ingredient.data })
  };

  // will expand
  renderTable(table) {
    switch (table) {
      case 'burger':
        return <BurgerTable table={this.state.burgers} />;

      default:
        return <ExtrasTable table={this.state.ingredients} />

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