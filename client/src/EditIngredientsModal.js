// import React, { useRef } from 'react';

// import Modal from 'react-bootstrap/modal'

// function EditIngredientModal(props) {
//     const name = useRef(null)
//     const calories = useRef(null)
//     const protein = useRef(null)
//     const fats = useRef(null)
//     const carbs = useRef(null)

//     function submitInformation() {
//         // props.editItem(
//         //     "ingredients",
//         //     {
//         //         id: props.data.id,
//         //         Type: props.data.type,
//         //         Name: name.current.value,
//         //         Calories: parseInt(calories.current.value),
//         //         Protein: parseInt(protein.current.value),
//         //         Carbs: parseInt(carbs.current.value),
//         //         Fats: parseInt(fats.current.value)
//         //     });
//         props.onHide()
//     }

//     return (
//         <Modal
//             {...props}
//             size="lg"
//             aria-labelledby="contained-modal-title-vcenter"
//             centered
//         >
//             <Modal.Header>
//                 <Modal.Title>
//                     <label className="p-2">Name: <input ref={name} type="text"></input></label>
//                 </Modal.Title>
//             </Modal.Header>

//             <Modal.Footer>
//                 <button onClick={props.onHide}>Close</button>
//                 <button onClick={submitInformation}>Update</button>
//             </Modal.Footer>
//         </Modal >
//     );
// }

// export default EditIngredientModal

import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class EditIngredientModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            calories: 0,
            carbs: 0,
            fats: 0,
            id: 0,
            name: "",
            protein: 0,
            type: ""
        }

        // this.changeName = this.changeName.bind(this)
    }

    componentDidUpdate(prevProps) {
        // this triggers during EditburgerModal interactions and crashes so the extra condition is needed
        if (this.props.data !== prevProps.data && this.props.show) {
            this.setState({
                calories: this.props.data.calories,
                carbs: this.props.data.carbs,
                fats: this.props.data.fats,
                id: this.props.data.id,
                name: this.props.data.name,
                protein: this.props.data.protein,
                type: this.props.data.type,
            });
        }
    }

    changeName(event) {
        var newName = event.target.value
        this.setState({ name: newName })
    }

    submitInformation() {

        // var name = this.state.name
        // var ingArr = this.state.burgerArr
        // var id = this.state.id

        this.props.editItem("ingredients", {
            // name, ingArr, id
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
            >
                <Modal.Header>
                    <Modal.Title>
                        {/* <label>Name: <input type="text" value={this.state.name} onChange={this.changeName}></input></label> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label>Calories:<input ref={calories} type="number"></input></label>
                            </div>
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label>Protein:<input ref={protein} type="number"></input></label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label>Carbs:<input ref={carbs} type="number"></input></label>
                            </div>
                            <div className="col-6 d-flex justify-content-center p-2">
                                <label>Fats:<input ref={fats} type="number"></input></label>
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