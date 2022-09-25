/**
 * App.js
 */

import React from "react";
import Table from './Table';
import Form from './Form';

/**
 * read the carros'data from API
 * To access data, is necessary to create a PROXY
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */

async function getCarros() {
  // read the carros'data from API
  let carrosData = await fetch("api/carrosAPI/");
  
  // avaliate the data collected
  if (!carrosData.ok) {
    // ok, means HTTP code: 200
    console.error(carrosData);
    throw new Error("something went wrong when accessing Carros'data. HTTP Code: ",
      carrosData.state);
  }

  // return the collected data, in JSON format
  return await carrosData.json();
}


/**
 * read the owners'data from API
 * To access data, is necessary to create a PROXY
 * https://create-react-app.dev/docs/proxying-api-requests-in-development/
 */
  /**
   * read the owners'data from API
   * To access data, is necessary to create a PROXY
   * https://create-react-app.dev/docs/proxying-api-requests-in-development/
   */
  async function getClientes() {
    // read the onwers'data from API
    let clientesData = await fetch("/api/clientesAPI/");

    // avaliate the data collected
    if (!clientesData.ok) {
      // ok, means HTTP code: 200
      console.error(clientesData);
      throw new Error("something went wrong when accessing owners'data. HTTP Code: ",
        clientesData.state);
    }
    // return the collected data, in JSON format
    return await clientesData.json();
  }

/**
 * this function is the function that realy sends new carro data to API
 * // Submissão de dados para a API
//    https://developer.mozilla.org/pt-BR/docs/Web/API/FormData
//    https://developer.mozilla.org/en-US/docs/Web/API/FormData/Using_FormData_Objects
 * @param {*} carro 
 */
async function AddCarro(carro) {
  console.log(carro)
  // create an object to transport data from React to API
  let formData = new FormData();
  formData.append("Marca", carro.Marca);
  formData.append("Modelo", carro.Modelo);
  formData.append("Matricula", carro.Matricula);
  formData.append("Ano", carro.Ano);
  formData.append("ClienteFK", carro.ClienteFK);
  formData.append("uploadPhoto", carro.uploadPhoto);

  // send data to API
  let resposta = await fetch("api/carrosAPI",
    {
      method: "POST",
      body: formData,
    }
  );
  if (!resposta.ok) {
    console.error(resposta);
    throw new Error("it was not possible to add the carro. Code: ",
      resposta.status)
  }
  return await resposta.json();
}

/**
 * Sends data to API to delete the car
 * @param {*} carroId 
 */
async function deleteCarro(carroId) {
  let formData = new FormData();
  formData.append("id", carroId);
  // send data to API
  let resposta = await fetch("api/carrosAPI/"+carroId,
    {
      method: "DELETE",
      body: formData
    })
  if (!resposta.ok) {
    console.log(resposta);
    throw new Error("It ws not possible to delete the car. Code: ", resposta.status)
  }
  else {
    alert("the car was deleted");
  }
}


class App extends React.Component {
  state = {
    carros: [],
    clientes: [],
  }


  /**
   * this function acts like a 'startup' when
   * the component is started
   *//*  
/*   

  /**
   * load the cars' data, from API
   */

   componentDidMount() {
    // vai ser dada ordem de carregamento dos dados dos Carros
    this.LoadCarros();
    // e, dos donos
    this.LoadClientes();
  }

  async LoadCarros() {
    try {
      // ask for data, from API
      let carrosFromAPI = await getCarros();
      // after receiving data, store it at state
      this.setState({ carros: carrosFromAPI })
    } catch (ex) {
      
      console.error("Error: it was not possible to read Cars' data", ex)
    }
  }

  /**
 * load the Owners' data, from API
 */
  async LoadClientes() {
    try {
      // ask for data, from API
      let clientesFromAPI = await getClientes();
      // after receiving data, store it at state
      this.setState({ clientes: clientesFromAPI })
    } catch (ex) {
      console.error("Error: it was not possible to read owners' data", ex)
    }
  }

  /**
   * send the new car data to API
   * @param {*} carro 
   */
  handleNewCarroData = async (carro) => {
    /**
     * 1. read new car data
     * 2. send it to API
     * 3. redraw the Table
     */

    // 1. already done. New car data is send by parameter

    // 2.
    try {
      await AddCarro(carro);
    } catch (error) {
      console.error("Something went wrong when a new car was sento to API. ", error);
    }
    // 3.
    await this.LoadCarros();
  }

  /**
   * request the action to Delete the car that user choosed
   * @param {*} carroId 
   */
  handleDeleteCarro = async (carroId) => {
    try {
      await deleteCarro(carroId);
    } catch (error) {
      console.error("Error when deleting the car", error);
    }
    // redraw the table
    await this.LoadCarros();
  }
   

  render() {
    const { carros, clientes } = this.state;

    return (
      <div className="container">
        <h1>Carros</h1>
        <h4>Carro Novo:</h4>
         <Form clientesIN={clientes} newCarroOUT={this.handleNewCarroData} /> 

        <br />
        <h4>Lista de Carros</h4>
         <Table carrosDataIN={carros} deleteCarrosOUT={this.handleDeleteCarro} /> 
         
      </div>
    )
  }

}

export default App;
