import React from 'react';

function BurgerTable(props) {


    return (
        <div>
            <button type="button" className="btn btn-secondary">Create New Burger</button>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.table.map((item) =>
                        <tr key={item.id}>
                            <th scope="row">{item.id}</th>
                            <td><span className="flex-grow-1">{item.name}</span></td>
                            <td><button type="button" className="btn btn-primary">View</button></td>
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

export default BurgerTable