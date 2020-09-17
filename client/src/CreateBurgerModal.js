import React, { useRef } from 'react';

import Modal from 'react-bootstrap/modal'

function CreateBurgerModal(props) {
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

    const bunOptions = (refName) => <select ref={refName}>
        {props.ingredients.map((ingredient, i) => {
            if (ingredient.type !== "Bun") return null
            else return <option key={i} value={ingredient.name}>{ingredient.name}</option>
        })}
    </select>

    const ingredientOptions = (refName) => <select ref={refName}>
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
                    <label>Name: <input ref={name} type="text"></input></label>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <label>Bun:{bunOptions(bun)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 1:{ingredientOptions(ing1)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 2:{ingredientOptions(ing2)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 3:{ingredientOptions(ing3)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 4:{ingredientOptions(ing4)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 5:{ingredientOptions(ing5)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 6:{ingredientOptions(ing6)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 7:{ingredientOptions(ing7)}</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <label>Layer 8:{ingredientOptions(ing8)}</label>
                        </div>
                        <div className="col-6">
                            <label>Layer 9:{ingredientOptions(ing9)}</label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
                <button onClick={() => props.createItem({
                    table: "burger",
                    Name: name.current.value ? name.current.value : "Placeholder Name",
                    Bun: bun.current.value,
                    Ing1: ing1.current.value !== "None" ? ing1.current.value : null,
                    Ing2: ing2.current.value !== "None" ? ing2.current.value : null,
                    Ing3: ing3.current.value !== "None" ? ing3.current.value : null,
                    Ing4: ing4.current.value !== "None" ? ing4.current.value : null,
                    Ing5: ing5.current.value !== "None" ? ing5.current.value : null,
                    Ing6: ing6.current.value !== "None" ? ing6.current.value : null,
                    Ing7: ing7.current.value !== "None" ? ing7.current.value : null,
                    Ing8: ing8.current.value !== "None" ? ing8.current.value : null,
                    Ing9: ing9.current.value !== "None" ? ing9.current.value : null,
                })}>Edit</button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateBurgerModal