import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class CreateBurgerModal extends Component {
    constructor(props) {
        super();
        this.state = {
            burgerArr: [0],
        }

        this.editBurgerArr = this.editBurgerArr.bind(this);
        this.createBurgeri = this.createBurgeri.bind(this);
        this.deleteBurgeri = this.deleteBurgeri.bind(this);
    }


    editBurgerArr(event) {
        var i = event.target.name
        var value = event.target.value
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

    submitInformation(ingID) {
        console.log(this.state.burgerArr)
        console.log(this.props.ingredients)

        console.log(ingID)
        console.log(this.props.ingredients[2])


        // this.props.onHide()
    }

    ingType(ingID) {

        // return <span>{value}</span>

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
                        {/* <label>Name: <input ref={name} type="text"></input></label> */}
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
                            {this.state.burgerArr.map((ingID, i) =>
                                <tr key={i}>
                                    <th scope="row">{i}</th>
                                    <th>
                                        {/* {this.ingType(ingID)} */}
                                        {this.props.ingredients.map((ing, index) => {
                                            var value = ""
                                            if (ingID === 0) value = "empty";
                                            if (ing.id === this.state.burgerArr[index]) value = ing.type;
                                        })}
                                    </th>
                                    <th>
                                        <select value={ingID} name={i} onChange={this.editBurgerArr}>
                                            <option value="0">Empty</option>
                                            {this.props.ingredients.map((ing) => {
                                                if (i === 0) {
                                                    if (ing.type !== "Bun") return false
                                                    else return <option key={ing.id} value={ing.id}>{ing.name}</option>
                                                } else {
                                                    if (ing.type === "Bun") return false
                                                    else return <option key={ing.id} value={ing.id}>{ing.name}</option>
                                                }
                                            })}
                                        </select>
                                    </th>
                                    <td><button type="button" className="btn btn-primary" onClick={() => this.createBurgeri(i)}>Insert</button></td>
                                    {i === 0 ?
                                        <td><button type="button" className="btn btn-danger" disabled>X</button></td>
                                        :
                                        <td><button type="button" className="btn btn-danger" onClick={() => this.deleteBurgeri(i)}>X</button></td>
                                    }
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                    <button onClick={() => this.submitInformation(5)}>Create</button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateBurgerModal