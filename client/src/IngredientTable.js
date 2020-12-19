import React from 'react';

function IngredientTable(props) {

    return (
        <div>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Calories</th>
                        <th scope="col">Carbs</th>
                        <th scope="col">Fats</th>
                        <th scope="col">Protein</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.table.map((item) =>
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td><span>{item.name}</span></td>
                            <td><span>{item.calories}</span></td>
                            <td><span>{item.carbs}</span></td>
                            <td><span>{item.fats}</span></td>
                            <td><span>{item.protein}</span></td>
                            <td><button type="button" className="btn btn-primary" onClick={() => props.viewModals("EditIngredient", item)}>Edit</button></td>
                            <td><button type="button" className="btn btn-danger" onClick={() => props.deleteIngredient(item.id)}>X</button></td>
                        </tr>
                    )}
                    <tr>
                        <th scope="row" colSpan="9">
                            <button type="button" className="btn btn-secondary" onClick={() => props.viewModals("CreateIngredient", null)}> Create New Ingredient</button>
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default IngredientTable