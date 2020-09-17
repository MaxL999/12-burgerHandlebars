import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function EditIngredientModal(props) {
    const name = useRef(null)
    const calories = useRef(null)
    const protein = useRef(null)
    const fats = useRef(null)
    const carbs = useRef(null)

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <label className="p-2">Name: <input ref={name} type="text" defaultValue={props.data.name}></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Calories:<input ref={calories} type="number" defaultValue={props.data.Calories}></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Protein:<input ref={protein} type="number" defaultValue={props.data.Protein}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Carbs:<input ref={carbs} type="number" defaultValue={props.data.Carbs}></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Fats:<input ref={fats} type="number" defaultValue={props.data.Fats}></input></label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
                <button onClick={() => props.editItem({
                    table: "ingredients",
                    id: props.data.id,
                    Type: props.data.type,
                    Name: name.current.value,
                    Calories: calories.current.value,
                    Protein: protein.current.value,
                    Carbs: carbs.current.value,
                    Fats: fats.current.value
                })}>Edit</button>
            </Modal.Footer>
        </Modal >
    );
}

export default EditIngredientModal