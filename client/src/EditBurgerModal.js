import React from 'react';

import Modal from 'react-bootstrap/modal'

function EditBurgerModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    <span>Name: <input defaultValue={props.data.name}></input></span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <span>Bun:<input defaultValue={props.data.bun}></input></span>
                    {/* i will use datalists for most of this */}
                    <span>Layer 1:<input defaultValue={props.data.ing1}></input></span>
                    <span>Layer 2:<input defaultValue={props.data.ing2}></input></span>
                    <span>Layer 3:<input defaultValue={props.data.ing3}></input></span>
                    <span>Layer 4:<input defaultValue={props.data.ing4}></input></span>
                    <span>Layer 5:<input defaultValue={props.data.ing5}></input></span>
                    <span>Layer 6:<input defaultValue={props.data.ing6}></input></span>
                    <span>Layer 7:<input defaultValue={props.data.ing7}></input></span>
                    <span>Layer 8:<input defaultValue={props.data.ing8}></input></span>
                    <span>Layer 9:<input defaultValue={props.data.ing9}></input></span>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditBurgerModal