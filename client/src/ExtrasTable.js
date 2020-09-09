import React from 'react';

function ExtrasTable(props) {


    return (
        <div>
            <button type="button" className="btn btn-secondary">Create New Ingredient</button>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Calories</th>
                        <th scope="col">Carbs</th>
                        <th scope="col">Fats</th>
                        <th scope="col">Protien</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.table.map((item) =>
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td><span>{item.name}</span></td>
                            <td><span>{item.Calories}</span></td>
                            <td><span>{item.Carbs}</span></td>
                            <td><span>{item.Fats}</span></td>
                            <td><span>{item.Protien}</span></td>
                            <td><button type="button" className="btn btn-primary">Edit</button></td>
                            <td><button type="button" className="btn btn-danger">Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button onClick={() => console.log(props)}>click</button>
        </div>
    )
}

export default ExtrasTable