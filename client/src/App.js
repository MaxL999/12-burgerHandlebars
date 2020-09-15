import React, { Component } from 'react';
import './App.css';

import BurgerTable from './BurgerTable';
import IngredientTable from './IngredientTable';

import ViewBurgerModal from './ViewBurgerModal';
import EditBurgerModal from './EditBurgerModal';
import CreateBurgerModal from './CreateBurgerModal';
import EditIngredientModal from './EditIngredientsModal';
import CreateIngredientModal from './CreateIngredientModal';

import API from './router/API';

class App extends Component {
  constructor() {
    super()

    this.searchMYSQL = this.searchMYSQL.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.viewModals = this.viewModals.bind(this)
  }

  state = {
    table: 'burger',
    burgers: [],
    ingredients: [],
    objectValues: {},
    ViewNutrition: false,
    EditBurger: false,
    CreateBurger: false,
    EditIngredient: false,
    CreateIngredient: false
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

  async viewModals(modal, props) {
    switch (modal) {
      case "Nutrition":
        await this.setState({ ViewNutrition: true, objectValues: props })
        break;
      case "CreateBurger":
        await this.setState({ CreateBurger: true })
        break;
      case "EditBurger":
        await this.setState({ EditBurger: true, objectValues: props })
        break;
      case "CreateIngredient":
        await this.setState({ CreateIngredient: true })
        break;
      case "EditIngredient":
        await this.setState({ EditBurger: true, objectValues: props })
        break;
    }
  }

  // spawn burger table, or filter ingredients list for specific type
  renderTable(table) {
    if (table === "burger") {
      return <BurgerTable
        table={this.state.burgers}
        deleteItem={this.deleteItem}
        viewModals={this.viewModals}
      />
    } else {
      let i = 0
      let list = []
      for (i = 0; i < this.state.ingredients.length; i++) {
        if (table === this.state.ingredients[i].type) {
          list.push(this.state.ingredients[i])
        }
      }
      return <IngredientTable table={list} deleteItem={this.deleteItem} viewModals={this.viewModals} />;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

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

          {/* the tables themselves */}
          {this.renderTable(this.state.table)}

          {/* each individual model */}
          <ViewBurgerModal
            data={this.state.objectValues}
            show={this.state.ViewNutrition}
            onHide={() => this.setState({ ViewNutrition: false })}
          />

          <EditBurgerModal
            data={this.state.objectValues}
            show={this.state.EditBurger}
            onHide={() => this.setState({ EditBurger: false })}
          />

          <CreateBurgerModal
            show={this.state.CreateBurger}
            onHide={() => this.setState({ CreateBurger: false })}
          />

          <EditIngredientModal
            data={this.state.objectValues}
            show={this.state.EditBurger}
            onHide={() => this.setState({ EditBurger: false })}
          />

          <CreateIngredientModal
            show={this.state.CreateIngredient}
            onHide={() => this.setState({ CreateIngredient: false })}
          />

        </header>
      </div>
    );
  }
}

export default App;