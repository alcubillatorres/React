import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

class Cliente extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Clientes: "",
      ViewAddClient: "false",
      Nombre: "",
      Numero: "",
      Key: "",
      ClienteSelected: "",
    };
  }

  handleOnChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleAddClient = (event) => {
    this.setState({
      ViewAddClient: "true",
    });
    event.preventDefault();
  };

  handleSubmit = (event) => {
    const data = {
      Nombre: this.state.Nombre,
      Key: this.state.Key,
      Numero: this.state.Numero,
    };

    const url = "http://172.18.10.79:4000/clientes";

    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        this.setState({
          Nombre: "",
          Key: "",
          Numero: "",
          Gateway: "",
          ViewAddClient: "false",
        });
        alert("Registro Exitoso");
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );
  };

  componentDidMount() {
    const url = "http://172.18.10.79:4000/clientes";


    axios({
      method: "get",
      url: url,
    }).then(
      (response) => {
        console.log(response.data);
        this.setState({
          Clientes: response.data,
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );



    
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-6">
            <img src="axtel.png" alt="axtel logo" className="image-title"></img>
          </div>
          <div className="col-6 d-flex align-items-end flex-column">
            <div className="mt-auto p-2 alert alert-light">
              <Link to="/" className="alert-link">
                Inicio
              </Link>
            </div>
          </div>
        </div>
        <div className="page-header text-center mt-5">
          <h1>
            <small>Información del Cliente</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <hr></hr>
          <label className="mr-2">Cliente</label>

          {this.state.Clientes.length !== 0 && (
            <span>
              <select
                value={this.state.ClienteSelected}
                onChange={this.handleOnChange}
                name="ClienteSelected"
                className="form-select ml-2"
              >
                <option></option>
                {this.state.Clientes.map((cliente, key) => (
                  <option key={key} value={cliente.Nombre}>
                    {cliente.Nombre}
                  </option>
                ))}
              </select>

              

            </span>
          )}

          <button
            type="text"
            className="rounded-circle btn btn-light btn-sm ml-2"
            onClick={this.handleAddClient}
          >
            +
          </button>

          {this.state.ViewAddClient === "true" && (
            <span>
              <div className="mb-2 mt-3 d-flex align-items-center">
                <label>Nombre: </label>
                <input
                  name="Nombre"
                  className="form-control ml-2"
                  type="text"
                  value={this.state.Nombre}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="mb-2 mt-3 d-flex align-items-center">
                <label>Número: </label>
                <input
                  name="Numero"
                  className="form-control ml-2"
                  type="text"
                  value={this.state.Numero}
                  onChange={this.handleOnChange}
                />
              </div>
              <div className="mb-2 mt-3 d-flex align-items-center">
                <label>Llave: </label>
                <input
                  name="Key"
                  className="form-control ml-2"
                  type="text"
                  value={this.state.Key}
                  onChange={this.handleOnChange}
                />
              </div>
              <button type="submit" className="mt-3 btn btn-outline-primary">
                Agregar
              </button>
            </span>
          )}
        </form>
      </div>
    );
  }
}
export default Cliente;
