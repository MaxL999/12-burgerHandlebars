import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class CreateBurgerModal extends Component {
    constructor() {
        super();
        this.state = {
            burgerArr: [0],
            name: "Pick a name!",
            ingArr: [],
        }

        this.changeName = this.changeName.bind(this)
        this.editBurgerArr = this.editBurgerArr.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        // ingredients array is sorted/organized whenever the props and state length dont match
        // IE on startup and state.length is empty, or whenever the ingredients are added/removed
        if (this.state.ingArr.length !== this.props.ingredients.length) {

            var oldIngArr = this.props.ingredients
            var sortIngArr = []
            var sortOrder = ["Bun", "Meat", "Cheese", "Vegetable", "Condiment"]

            for (var i = 0; i < sortOrder.length; i++) {
                for (var t = 0; t < oldIngArr.length; t++) {
                    if (sortOrder[i] === oldIngArr[t].type) {
                        sortIngArr.push(oldIngArr[t])
                    }
                }
            }

            this.setState({ ingArr: sortIngArr })
        }
    }

    changeName(event) {
        var newName = event.target.value
        this.setState({ name: newName })
    }

    editBurgerArr(event) {
        var i = event.target.name
        var value = parseInt(event.target.value)
        var tempVal = this.state.burgerArr
        tempVal.splice(i, 1, value)
        this.setState({ burgerArr: tempVal })
    }

    createBurgeri(i) {
        i = i + 1
        var tempVal = this.state.burgerArr
        tempVal.splice(i, 0, 0)
        this.setState({ burgerArr: tempVal })
    }

    deleteBurgeri(i) {
        var tempVal = this.state.burgerArr
        tempVal.splice(i, 1)
        this.setState({ burgerArr: tempVal })
    }

    submitInformation() {
        this.props.createItem("burgers", {
            name: this.state.name,
            burgerArr: this.state.burgerArr
        })
        this.props.onHide()
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                animation={false}
            >
                <Modal.Header>
                    <Modal.Title>
                        <label>Name: <input type="text" value={this.state.name} onChange={this.changeName}></input></label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">Layer</th>
                                <th scope="col">Type</th>
                                <th scope="col">Name</th>
                                <th scope="col">Insert New</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.burgerArr.map((ingID, index) => {
                                // finds what type of ingredient each option is for printing
                                var ingType
                                var ingArr = this.state.ingArr
                                for (var i = 0; i < ingArr.length; i++) {
                                    if (ingID === 0) ingType = "Empty";
                                    if (ingID === ingArr[i].id) ingType = ingArr[i].type;
                                }
                                return <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <th>
                                        <span>{ingType}</span>
                                    </th>
                                    <th>
                                        <select value={ingID} name={index} onChange={this.editBurgerArr}>
                                            <option value={0}>Empty</option>
                                            {this.state.ingArr.map((ing) => {
                                                // the bun layer can only select buns
                                                if (index === 0) {
                                                    if (ing.type !== "Bun") return false
                                                    else return <option key={ing.id} value={ing.id}>{ing.name}</option>
                                                } else {
                                                    if (ing.type === "Bun") return false
                                                    else return <option key={ing.id} value={ing.id}>{ing.name}</option>
                                                }
                                            })}
                                        </select>
                                    </th>
                                    <td><button type="button" className="btn btn-primary" onClick={() => this.createBurgeri(index)}>Insert</button></td>
                                    {/* the bun option is un-deletable, a burger needs a wrapper of some kind! */}
                                    {index === 0 ?
                                        <td><button type="button" className="btn btn-danger" disabled>X</button></td>
                                        :
                                        <td><button type="button" className="btn btn-danger" onClick={() => this.deleteBurgeri(index)}>X</button></td>
                                    }
                                </tr>
                            })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                    <button onClick={() => this.submitInformation()}>Create</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateBurgerModal