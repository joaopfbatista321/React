/**
 * Form.js
 */

import React from "react";

/**
 * this component will create a 'dropdown' with owners' data
 */
const ChooseCliente = (props) => {
    const options = props.clientesDataIN.map((row) => {
        return <option value={row.id}>{row.nome}</option>
    })
    return (
        <select className="form-select"
            onChange={props.choosedClienteOUT} >
            <option value="">Escolher um cliente</option>
            {options}
        </select>
    )
}





class Form extends React.Component {
    newCarro = {
        carroMarca: "",
        carroModelo: "",
        carroMatricula: "",
        carroAno: "",
        carroPhoto: null,
        carroClienteFK: "",
    }

    state = this.newCarro;

    /**
     * function to handle data provided by 'input' field
     * @param {*} event 
     */
    handleAdd = (event) => {
        // read the data available at 'event'
        const { name, value } = event.target
        // assign to the state identified by 'name' withe the 'value' writed by user
        this.setState({
            [name]: value,
        })
    }

    /**
     * read the selected owner
     * @param {*} event 
     */
    handleClienteChange = (event) => {
        this.setState({ carroClienteFK: event.target.value });
    }

    /**
     * add the photo file to state
     */
    handlePhotoChange = (event) => {
        this.setState({ carroPhoto: event.target.files[0] })
    }

    /**
     * Sends data collect by the Form to API
     * @param {*} event 
     */
    handleForm = (event) => {
        // this statement will prevent Form to submit do Server the data
        event.preventDefault();

        // specefy an objet to transport data to API
        let formData = {
            Marca: this.state.carroMarca,
            Modelo: this.state.carroModelo,
            Matricula: this.state.carroMatricula,
            Ano: this.state.carroAno,
            uploadPhoto: this.state.carroPhoto,
            ClienteFK: this.state.carroClienteFK,
        }
        // export data to <App />
        this.props.newCarroOUT(formData);

    }



    render() {
        // read the state and props values
        const { carroMarca, carroModelo, carroMatricula, carroAno } = this.state;
        const { clientesIN } = this.props;

        return (
            <form method="POST"
                encType="multipart/form-data"
                onSubmit={this.handleForm}
            >
                <div className="row">
                    <div className="col-md-4">
                        Marca: <input type="text"
                            required
                            className="form-control"
                            name="carroMarca"
                            value={carroMarca}
                            onChange={this.handleAdd}
                        /><br />
                        Ano: <input type="text"
                            required
                            className="form-control"
                            name="carroAno"
                            value={carroAno}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Modelo: <input type="text"
                            required
                            className="form-control"
                            name="carroModelo"
                            value={carroModelo}
                            onChange={this.handleAdd}
                        /><br />
                        Matricula: <input type="text"
                            required
                            className="form-control"
                            name="carroMatricula"
                            value={carroMatricula}
                            onChange={this.handleAdd}
                        />
                    </div>
                    <div className="col-md-4">
                        Photo: <input type="file"
                            name="carroPhoto"
                            accept=".jpg,.png"
                            className="form-control"
                            onChange={this.handlePhotoChange}
                        />
                        <br />
                        {/* o componente 'EscolheDono' irá ter dois parâmetros:
                            - dadosDonos: serve para introduzir no componente a lista dos donos a representar na dropdown
                            - idDonoEscolhido: serve para retirar do componente, o ID do dono que o utilizador escolheu,
                          que será entregue ao 'handlerDonoChange' */}
                        Cliente: <ChooseCliente clientesDataIN={clientesIN}
                            choosedClienteOUT={this.handleClienteChange} />                         <br />
                    </div>
                </div>
                <input type="submit"
                    value="Adicionar carro "
                    className="btn btn-outline-primary" />
            </form>
        )
    }
}

export default Form;