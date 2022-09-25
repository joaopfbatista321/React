/**
 * Table.js
 * 
 * This table shows a simple list of students
 */

import React, { Component } from "react";

/**
 * write the table header
 * @returns 
 */
function Header() {
    return (
        <thead>
            <tr>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Matricula</th>
                <th>Ano</th>
                <th>Cliente</th>
                <th>Photo</th>
                <th></th>
            </tr>
        </thead>
    )
}

/**
 * write the table body
 * @param {*} props : the data to be writed: a list of students
 * @returns 
 */
const Body = (props) => {
    // we are building each table row, with the data we receive
    // <=> foreach()
    const rows = props.dataTableIN.map((row) => {
        console.log(row)
        return (
            <tr key={row.id}>
                <td>{row.marca}</td>
                <td>{row.modelo}</td>
                <td>{row.matricula}</td>
                <td>{row.ano}</td>
                <td>{row.nomeCliente}</td>
                <td><img src={'Carros/' + row.photo}
                    alt={'photo of ' + row.marca}
                    title={row.marca}
                    height="50" />
                </td>
                <td>
                    <button className="btn btn-outline-danger"
                            onClick={() => props.carroToBeDeletedOUT(row.id)}
                    >Delete</button>
                </td>
            </tr>
        )
    })

    // we return the body of table, with the 'rows' defined up
    return <tbody>{rows}</tbody>
}


/**
 * the code of component Table
 */
class Table extends Component {
    render() {
        // 'read' data that was supplied to component 'Table'
        const { carrosDataIN, deleteCarrosOUT } = this.props
        console.log(deleteCarrosOUT)

        return (
            <table className="table table-striped table-sucess">
                <Header />
                <Body dataTableIN={carrosDataIN} carroToBeDeletedOUT={deleteCarrosOUT} />
                {/*        <-----------                      --------------->*/}
            </table>
        )
    }
}

export default Table;