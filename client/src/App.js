import React, { Component } from 'react';
import './App.css';

import BurgerTable from './BurgerTable';
import IngredientTable from './IngredientTable';

import ViewBurgerModal from './ViewBurgerModal';

import API from './router/API';

class App extends Component {
  constructor() {
    super()

    this.searchMYSQL = this.searchMYSQL.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  state = {
    table: 'burger',
    burgers: [],
    ingredients: [],
    showModal: false,
  }

  componentDidMount() {
    this.searchMYSQL()
  };

  async searchMYSQL() {
    let burger = await API.table("burger")
    let ingredient = await API.table("ingredients")
    this.setState({ burgers: burger.data, ingredients: ingredient.data })
  }

  async deleteItem(table, id) {
    await API.delete(table, id)
    this.searchMYSQL()
  }

  // spawn burger table, or filter ingredients list for specific type
  renderTable(table) {
    if (table === "burger") {
      return <BurgerTable table={this.state.burgers} deleteItem={this.deleteItem} />
    } else {
      let i = 0
      let list = []
      for (i = 0; i < this.state.ingredients.length; i++) {
        if (table === this.state.ingredients[i].type) {
          list.push(this.state.ingredients[i])
        }
      }
      return <IngredientTable table={list} deleteItem={this.deleteItem} />;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <button onClick={() => this.setState({ showModal: true })}>Click</button>

          <div className="d-flex justify-content-around p-2">
            <button onClick={() => this.setState({ table: 'burger' })} >Burger</button>
            <button onClick={() => this.setState({ table: 'Meat' })} >Meat</button>
            <button onClick={() => this.setState({ table: 'Cheese' })} >Cheese</button>
            <button onClick={() => this.setState({ table: 'Bun' })} >Bun</button>
            <button onClick={() => this.setState({ table: 'Vegetable' })} >Vegetable</button>
            <button onClick={() => this.setState({ table: 'Condiment' })} >Condiments</button>
            {/* button to reseed MYSQL if someone edits incorrectly */}
            {/* <button onClick={}>Reset Database</button> */}
          </div>

          <div>
            {this.renderTable(this.state.table)}
          </div>

          <div>
            <ViewBurgerModal
              show={this.state.showModal}
              onHide={() => this.setState({ showModal: false })}
            />
          </div>

        </header>
      </div>
    );
  }
}

export default App;