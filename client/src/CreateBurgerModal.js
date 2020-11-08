import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class CreateBurgerModal extends Component {
    constructor(props) {
        super();
        this.state = {
            burgerArr: [0],
            name: "Pick a name!"
        }

        this.changeName = this.changeName.bind(this)
        this.editBurgerArr = this.editBurgerArr.bind(this);
        this.createBurgeri = this.createBurgeri.bind(this);
        this.deleteBurgeri = this.deleteBurgeri.bind(this);
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
        console.log(this.state.name)
        console.log(this.state.burgerArr)

        // this.props.onHide()
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
                                <th scope="col">Insert</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.burgerArr.map((ingID, index) => {
                                var i
                                var ingType
                                var ingArr = this.props.ingredients
                                for (var i = 0; i < ingArr.length; i++) {
                                    if (ingID === 0) var ingType = "Empty";
                                    if (ingID === ingArr[i].id) var ingType = ingArr[i].type;
                                }
                                return <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <th>
                                        <span>{ingType}</span>
                                    </th>
                                    <th>
                                        <select value={ingID} name={index} onChange={this.editBurgerArr}>
                                            <option value={0}>Empty</option>
                                            {this.props.ingredients.map((ing) => {
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