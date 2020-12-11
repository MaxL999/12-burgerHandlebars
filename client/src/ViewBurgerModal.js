import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class ViewBurgerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            burger: {},
            nutritionTable: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // this.state.burger !== this.props.current &&
        if (this.props.show && this.state.burger !== this.props.current) {
            var nutritionData = [];
            var totalCal = 0;
            var totalCarb = 0;
            var totalProtein = 0;
            var totalFat = 0;
            var array = JSON.parse(this.props.current.ingArr)

            for (var i in array) {
                const ing = this.props.ingredients.find(ingredient => ingredient.id === array[i]);

                if (ing === typeof undefined) {
                    this.setState({ nutritionTable: false })
                    break
                }
                console.log(ing)

                totalCal = totalCal + ing.calories;
                totalCarb = totalCarb + ing.carbs;
                totalProtein = totalProtein + ing.protein;
                totalFat = totalFat + ing.fats;
                nutritionData.push(ing)
            }

            nutritionData.push({
                calories: totalCal,
                carbs: totalCarb,
                fats: totalProtein,
                protein: totalProtein,
            })

            console.log(nutritionData)

            this.setState({ nutritionTable: nutritionData, burger: this.props.current })
        }
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
                        {/* <h4>{this.props.data.name}</h4> */}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Calories</th>
                                <th scope="col">Carbs</th>
                                <th scope="col">Fats</th>
                                <th scope="col">Protein</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.nutritionTable.map((data) => {

                                // return <tr key={item.id}>
                                //     <th scope="row">{item.id}</th>
                                //     <td><span>{item.name}</span></td>
                                //     <td><span>{item.calories}</span></td>
                                //     <td><span>{item.carbs}</span></td>
                                //     <td><span>{item.fats}</span></td>
                                //     <td><span>{item.protein}</span></td>
                                // </tr>
                            })}
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default ViewBurgerModal