import React, { Component } from 'react';
import './App.css';

import BurgerTable from './BurgerTable';
import IngredientTable from './IngredientTable';

// import ViewBurgerModal from './ViewBurgerModal';
// import EditBurgerModal from './EditBurgerModal';
// import CreateBurgerModal from './CreateBurgerModal';
// import EditIngredientModal from './EditIngredientsModal';
// import CreateIngredientModal from './CreateIngredientModal';

import API from './router/API';

class App extends Component {
  constructor() {
    super()

    this.searchMYSQL = this.searchMYSQL.bind(this)
    this.restoreData = this.restoreData.bind(this)
    this.restoreSQLseeds = this.restoreSQLseeds.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.editItem = this.editItem.bind(this)
    this.createItem = this.createItem.bind(this)
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
    this.setState({
      burgers: burger.data,
      ingredients: ingredient.data,
    })
  }

  // fix seeds
  async restoreSQLseeds() {
    let newData = await API.restoreSQL()
    console.log(newData)
    this.setState({ burgers: newData.data[0], ingredients: newData.data[1] })
  }

  restoreData(table, newData) {
    if (table === "burger") {
      this.setState({ burgers: newData.data })
    } else {
      this.setState({ ingredients: newData.data })
    }
  }

  async deleteItem(table, id) {
    let newData = await API.delete(table, id)
    this.restoreData(table, newData)
  }

  async editItem(data) {
    let newData = await API.update(data)
    this.restoreData(data.table, newData)
  }

  async createItem(data) {
    var newData = await API.create(data)
    this.restoreData(data.table, newData)
  }

  async nutritionValue(id) {
    // console.log(id)
    // let data = await API.nutrition(id)
    // console.log(data)
    this.setState({ ViewNutrition: true, objectValues: id })
  }

  viewModals(modal, props) {
    switch (modal) {
      case "Nutrition":
        this.setState({ ViewNutrition: true, objectValues: props })
        break;
      case "CreateBurger":
        this.setState({ CreateBurger: true })
        break;
      case "EditBurger":
        this.setState({ EditBurger: true, objectValues: props })
        break;
      case "CreateIngredient":
        this.setState({ CreateIngredient: true })
        break;
      case "EditIngredient":
        this.setState({ EditIngredient: true, objectValues: props })
        break;
      default:
    }
  }

  // spawn burger table, or filter ingredients list for specific type
  renderTable(table) {
    if (table === "burger") {
      return <BurgerTable
        table={this.state.burgers}
        deleteItem={this.deleteItem}
        editItem={this.editItem}
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
      return <IngredientTable
        table={list}
        deleteItem={this.deleteItem}
        viewModals={this.viewModals}
      />;
    }
  }

  async test() {
    // let chars = ['A', 'B', 'A', 'C', 'B'];
    // let uniqueChars = [...new Set(chars)];

    // console.log(uniqueChars);
    let test = await API.table("burger")

    console.log(test)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">

          <button onClick={() => this.restoreSQLseeds()}>Restore SQL Seeds</button>
          <button onClick={() => this.test()}>Test Log</button>

          <div className="d-flex justify-content-around p-2">
            <button onClick={() => this.setState({ table: 'burger' })} >Burger</button>
            <button onClick={() => this.setState({ table: 'Meat' })} >Meat</button>
            <button onClick={() => this.setState({ table: 'Cheese' })} >Cheese</button>
            <button onClick={() => this.setState({ table: 'Bun' })} >Bun</button>
            <button onClick={() => this.setState({ table: 'Vegetable' })} >Vegetable</button>
            <button onClick={() => this.setState({ table: 'Condiment' })} >Condiments</button>
          </div>

          {/* the tables themselves */}
          {this.renderTable(this.state.table)}

          {/* each individual model */}
          {/* <ViewBurgerModal
            viewNutrition={this.nutritionValue}
            current={this.state.objectValues}
            burger={this.state.burgers}
            ingredients={this.state.ingredients}
            show={this.state.ViewNutrition}
            onHide={() => this.setState({ ViewNutrition: false })}
          />

          <EditBurgerModal
            editItem={this.editItem}
            burger={this.state.objectValues}
            ingredients={this.state.ingredients}
            show={this.state.EditBurger}
            onHide={() => this.setState({ EditBurger: false })}
          />

          <CreateBurgerModal
            createItem={this.createItem}
            ingredients={this.state.ingredients}
            show={this.state.CreateBurger}
            onHide={() => this.setState({ CreateBurger: false })}
          />

          <EditIngredientModal
            editItem={this.editItem}
            data={this.state.objectValues}
            show={this.state.EditIngredient}
            onHide={() => this.setState({ EditIngredient: false })}
          />

          <CreateIngredientModal
            createItem={this.createItem}
            type={this.state.table}
            show={this.state.CreateIngredient}
            onHide={() => this.setState({ CreateIngredient: false })}
          /> */}

        </header>
      </div >
    );
  }
}

export default App;