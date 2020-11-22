import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function EditIngredientModal(props) {
    const name = useRef(props.data.name)
    const calories = useRef(props.data.Calories)
    const protein = useRef(null)
    const fats = useRef(null)
    const carbs = useRef(null)

    function submitInformation() {
        props.editItem(
            "ingredients",
            {
                id: props.data.id,
                Type: props.data.type,
                Name: name.current.value,
                Calories: parseInt(calories.current.value),
                Protein: parseInt(protein.current.value),
                Carbs: parseInt(carbs.current.value),
                Fats: parseInt(fats.current.value)
            });
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
                    <label className="p-2">Name: <input ref={name} type="text" defaultValue={props.data.name}></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Calories:<input ref={calories} type="number" defaultValue={props.data.calories}></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Protein:<input ref={protein} type="number" defaultValue={props.data.protein}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Carbs:<input ref={carbs} type="number" defaultValue={props.data.carbs}></input></label>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <label>Fats:<input ref={fats} type="number" defaultValue={props.data.fats}></input></label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
                <button onClick={submitInformation}>Update</button>
            </Modal.Footer>
        </Modal >
    );
}

export default EditIngredientModal