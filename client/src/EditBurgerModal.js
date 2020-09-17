import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function EditBurgerModal(props) {
    const name = useRef(null)
    const bun = useRef(null)
    const ing1 = useRef(null)
    const ing2 = useRef(null)
    const ing3 = useRef(null)
    const ing4 = useRef(null)
    const ing5 = useRef(null)
    const ing6 = useRef(null)
    const ing7 = useRef(null)
    const ing8 = useRef(null)
    const ing9 = useRef(null)

    const bunOptions = (entry, refName) => <select defaultValue={entry} ref={refName}>
        {props.ingredients.map((ingredient, i) => {
            if (ingredient.type !== "Bun") return null
            else return <option key={i} value={ingredient.name}>{ingredient.name}</option>
        })}
    </select>

    const ingredientOptions = (entry, refName) => <select defaultValue={entry} ref={refName}>
        <option value={null}>None</option>
        {props.ingredients.map((ingredient, i) => {
            if (ingredient.type === "Bun") return null
            else return <option key={i} value={ingredient.name}>{ingredient.name}</option>
        })}
    </select>

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <label>Name: <input ref={name} type="text" defaultValue={props.burger.name}></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <label>Bun:{bunOptions(props.burger.bun, bun)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 1:{ingredientOptions(props.burger.ing1, ing1)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 2:{ingredientOptions(props.burger.ing2, ing2)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 3:{ingredientOptions(props.burger.ing3, ing3)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 4:{ingredientOptions(props.burger.ing4, ing4)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 5:{ingredientOptions(props.burger.ing5, ing5)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 6:{ingredientOptions(props.burger.ing6, ing6)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 7:{ingredientOptions(props.burger.ing7, ing7)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 8:{ingredientOptions(props.burger.ing8, ing8)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 9:{ingredientOptions(props.burger.ing9, ing9)}</label>
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
                    Bun: bun.current.value,
                    Ing1: ing1.current.value,
                    Ing2: ing2.current.value,
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