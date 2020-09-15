import React from 'react';

import Modal from 'react-bootstrap/modal'

function CreateBurgerModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    create ingredient
                </p>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    );
}

export default CreateBurgerModal