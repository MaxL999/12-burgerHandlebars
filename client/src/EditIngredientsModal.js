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
                    <span className="p-2">Name: <input defaultValue={props.data.name}></input></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <span>Calories:<input ref={calories} defaultValue={props.data.Calories}></input></span>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <span>Protein:<input ref={protein} defaultValue={props.data.Protien}></input></span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6 d-flex justify-content-center p-2">
                            <span>Carbs:<input ref={carbs} defaultValue={props.data.Carbs}></input></span>
                        </div>
                        <div className="col-6 d-flex justify-content-center p-2">
                            <span>Fats:<input ref={fats} defaultValue={props.data.Fats}></input></span>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                {/* <button onClick={() => console.log(props)}>Click</button> */}
                <button onClick={props.onHide}>Close</button>
                <button onClick={() => props.editItem(
                    {
                        id: props.data.id,
                        Name: name,
                        Calories: calories,
                        Protein: protein,
                        Carbs: carbs,
                        Fats: fats
                    }
                )}>Edit</button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditIngredientModal