import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function CreateIngredientModal(props) {
    const name = useRef(null)
    const type = useRef(null)
    const calories = useRef(null)
    const protein = useRef(null)
    const fats = useRef(null)
    const carbs = useRef(null)

    function submitInformation() {
        // alert if there is no name, needs expansion
        if (!name.current.value) {
            console.log("click")
        }
        props.createItem({
            table: "ingredients",
            name: name.current.value,
            type: type.current.value,
            calories: calories.current.value,
            protein: protein.current.value,
            carbs: carbs.current.value,
            fats: fats.current.value
        })
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <label className="p-2">Name: <input ref={name} defaultValue="Create a name" type="text"></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <label>Type: <select ref={type} defaultValue={props.type}>
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
                            <label>Calories:<input ref={calories} defaultValue={0} type="number"></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Protein:<input ref={protein} defaultValue={0} type="number"></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Carbs:<input ref={carbs} defaultValue={0} type="number"></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Fats:<input ref={fats} defaultValue={0} type="number"></input></label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
                <button onClick={submitInformation}>Create</button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateIngredientModal