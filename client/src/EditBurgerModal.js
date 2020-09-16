import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function EditBurgerModal(props) {
    const name = useRef(null)
    const ing1 = useRef(null)
    const ing2 = useRef(null)
    const ing3 = useRef(null)
    const ing4 = useRef(null)
    const ing5 = useRef(null)
    const ing6 = useRef(null)
    const ing7 = useRef(null)
    const ing8 = useRef(null)
    const ing9 = useRef(null)

    const options = (option) => <datalist id="ingredients">
        <option value="none" />
        {props.ingredients.map((ingredient) => {
            return <option value={ingredient.name} />
        })}
    </datalist>

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <label>Name: <input ref={name} defaultValue={props.burger.name}></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <label>Bun:<input type="text" defaultValue={props.burger.bun}></input></label>
                        </div>
                        <div className="col-6">
                            <label>Layer 1:<input ref={ing1} list="ingredients" defaultValue={props.burger.ing1}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 2:<input ref={ing2} list="ingredients" defaultValue={props.burger.ing2}></input></label>
                        </div>
                        <div className="col-6">
                            <label>Layer 3:<input ref={ing3} list="ingredients" defaultValue={props.burger.ing3}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 4:<input ref={ing4} list="ingredients" defaultValue={props.burger.ing4}></input></label>
                        </div>
                        <div className="col-6">
                            <label>Layer 5:<input ref={ing5} list="ingredients" defaultValue={props.burger.ing5}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 6:<input ref={ing6} list="ingredients" defaultValue={props.burger.ing6}></input></label>
                        </div>
                        <div className="col-6">
                            <label>Layer 7:<input ref={ing7} list="ingredients" defaultValue={props.burger.ing7}></input></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 8:<input ref={ing8} list="ingredients" defaultValue={props.burger.ing8}></input></label>
                        </div>
                        <div className="col-6">
                            <label>Layer 9:<input ref={ing9} list="ingredients" defaultValue={props.burger.ing9}></input></label>
                        </div>
                    </div>
                </div>



            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
                <button onClick={() => props.editItem({
                    table: "burger",
                    id: props.burger.id,
                    Name: name.current.value,
                    Ing1: ing1.current.value,
                    Ing2: ing3.current.value,
                    Ing3: ing3.current.value,
                    Ing4: ing4.current.value,
                    Ing5: ing5.current.value,
                    Ing6: ing6.current.value,
                    Ing7: ing7.current.value,
                    Ing8: ing8.current.value,
                    Ing9: ing9.current.value,
                })}>Edit</button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBurgerModal