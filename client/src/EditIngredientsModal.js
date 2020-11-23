import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class EditIngredientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            name: "",
            type: "",
            calories: 0,
            carbs: 0,
            fats: 0,
            protein: 0,
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.submitInformation = this.submitInformation.bind(this);
    }

    componentDidUpdate(prevProps) {
        // this triggers during EditburgerModal interactions and crashes so the extra condition is needed
        if (this.props.data !== prevProps.data && this.props.show) {
            this.setState({
                id: this.props.data.id,
                name: this.props.data.name,
                type: this.props.data.type,
                calories: this.props.data.calories,
                carbs: this.props.data.carbs,
                fats: this.props.data.fats,
                protein: this.props.data.protein,
            });
        }
    }

    handleInputChange(event) {
        const name = event.target.name;
        const value = event.target.type === "number"
            ? parseInt(event.target.value)
            : event.target.value

        this.setState({
            [name]: value
        });
    }

    submitInformation() {

        var ingredientEdit = {
            table: "ingredients",
            id: this.state.id,
            name: this.state.name,
            type: this.state.type,
            calories: this.state.calories,
            carbs: this.state.carbs,
            fats: this.state.fats,
            protein: this.state.protein
        }

        this.props.editItem(ingredientEdit)

        this.props.onHide()
    }

    render() {

        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header>
                    <Modal.Title>
                        <label> Name:
                            <input
                                type="text"
                                name="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                            />
                        </label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <label>Type:
                                    <select
                                        name="type"
                                        value={this.state.type}
                                        onChange={this.handleInputChange}
                                    >
                                        <option>Bun</option>
                                        <option>Meat</option>
                                        <option>Cheese</option>
                                        <option>Vegetable</option>
                                        <option>Condiment</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label> Calories:
                                    <input
                                        type="number"
                                        name="calories"
                                        value={this.state.calories}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                            </div>
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label> Protein:
                                    <input
                                        type="number"
                                        name="protein"
                                        value={this.state.protein}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label> Fats:
                                    <input
                                        type="number"
                                        name="fats"
                                        value={this.state.fats}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                            </div>
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label> Carbohydrates:
                                    <input
                                        type="number"
                                        name="carbs"
                                        value={this.state.carbs}
                                        onChange={this.handleInputChange}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                    <button onClick={() => this.submitInformation()}>Edit</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default EditIngredientModal