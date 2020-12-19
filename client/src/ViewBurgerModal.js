import React, { Component } from 'react';

import { Modal } from 'react-bootstrap'

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
            for (let i in array) {

                let findIng = this.props.ingredients.find(T => T.id === array[i])
                if (!findIng) return this.setState({ nutritionTable: false, name: burger.name })
                let ing = Object.create(findIng)

                totalCal = totalCal + ing.calories;
                totalCarb = totalCarb + ing.carbs;
                totalProtein = totalProtein + ing.protein;
                totalFat = totalFat + ing.fats;

                ing.key = i;
                nutritionData.push(ing)
            }

            nutritionData.push({
                key: "omega",
                name: "Total",
                calories: totalCal,
                carbs: totalCarb,
                fats: totalFat,
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
                                {this.state.nutritionTable.map((data) => {

                                    return <tr key={data.key}>
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