import React, { Component } from 'react';

import Modal from 'react-bootstrap/modal'

class ViewBurgerModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nutritionTable: [],
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.show && prevProps.current !== this.props.current) {
            var burger = this.props.burger.find(b => b.id === this.props.current)

            var totalCal = 0;
            var totalCarb = 0;
            var totalProtein = 0;
            var totalFat = 0;

            var nutritionData = [];

            var array = JSON.parse(burger.ingArr);
            for (var i in array) {
                const ing = this.props.ingredients.find(T => T.id === array[i]);

                if (!ing) return this.setState({ nutritionTable: false, name: burger.name })

                totalCal = totalCal + ing.calories;
                totalCarb = totalCarb + ing.carbs;
                totalProtein = totalProtein + ing.protein;
                totalFat = totalFat + ing.fats;
                nutritionData.push(ing)
            }

            nutritionData.push({
                name: "Total",
                calories: totalCal,
                carbs: totalCarb,
                fats: totalProtein,
                protein: totalProtein,
            })

            this.setState({ nutritionTable: nutritionData, name: burger.name })
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
                        <h4>{this.state.name}</h4>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {!this.state.nutritionTable
                        ? <span>Error, there is a missing ingredient</span>
                        : <table className="table table-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Calories</th>
                                    <th scope="col">Carbs</th>
                                    <th scope="col">Fats</th>
                                    <th scope="col">Protein</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.nutritionTable.map((data, i) => {

                                    return <tr key={i}>
                                        <td scope="row"><span>{data.name}</span></td>
                                        <td><span>{data.calories}</span></td>
                                        <td><span>{data.carbs}</span></td>
                                        <td><span>{data.fats}</span></td>
                                        <td><span>{data.protein}</span></td>
                                    </tr>
                                })}


                            </tbody>
                        </table>
                    }

                </Modal.Body>
                <Modal.Footer>
                    <button onClick={this.props.onHide}>Close</button>
                </Modal.Footer>
            </Modal >
        )
    }
}

export default ViewBurgerModal