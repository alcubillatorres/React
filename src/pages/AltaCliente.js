import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

class AltaCliente extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      Clientes: "",
      Nombre: "",
      Numero: "",
      Nuevo: false,
    };
  }
  componentDidMount() {
    this._isMounted = true;
    const url = "http://localhost:4000/clientes";
    axios({
      method: "get",
      url,
    }).then(
      (response) => {
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

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleOnChange = (e) => {
    const { value } = e.target;
    const nombre = value.split(".")[0];
    const numero = value.split(".")[1];
    this.setState({
      Numero: numero,
      Nombre: nombre,
      Nuevo: false,
    });
  };

  handleonClick = (e) => {
    this.setState({
      Nombre: "",
      Numero: "",
      Nuevo: true,
    });
  };

  handleChange = (e) => {
    console.log("handleOnChange");
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const data = {
      Nombre: this.state.Nombre.trim(),
      Numero: this.state.Numero.trim(),
    };
    const url = "http://localhost:4000/clientes";
    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        this.setState({
          Nombre: "",
          Numero: "",
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );
    this.props.history.push("/altaSitio");
  };

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div>
            <Navbar />
            <div className="mt-auto p-2 alert alert-light">
              <Link to="/" className="alert-link">
                <h4 className="d-inline">Inicio&gt;</h4>
              </Link>
              <Link to="/altaCliente" className="alert-link">
                <h4 className="d-inline">Alta Cliente&gt;</h4>
              </Link>
            </div>
            <hr></hr>
            <label className="mr-2 mb-2">Seleccionar Cliente:</label>

            {this.state.Clientes.length !== 0 && (
              <div className="align-items-center d-flex justify-content-space-between row mb-4">
                <div className="left col-3">
                  <label className="mr-2"> &emsp; &emsp;Nombre:</label>
                  <select
                    name="Nombre"
                    onChange={this.handleOnChange}
                    value={this.state.Nombre}
                  >
                    <option value=""></option>
                    {this.state.Clientes.map((cliente, key) => (
                      <option
                        key={key}
                        value={cliente.Nombre + "." + cliente.Numero}
                      >
                        {cliente.Nombre}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="center p-2 mr-2 ml-2 col-1">o</div>
                <div className="right col-3">
                  <label className="mr-2">Numero:</label>
                  <select
                    name="Numero"
                    value={this.state.Numero}
                    onChange={this.handleOnChange}
                  >
                    <option value=""></option>
                    {this.state.Clientes.map((cliente, key) => (
                      <option
                        key={key}
                        value={cliente.Nombre + "." + cliente.Numero}
                      >
                        {cliente.Numero}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col vcenter">
                  <button
                    type="text"
                    className="btn btn-primary btn-circle btn-sm"
                    onClick={this.handleonClick}
                  >
                    + Agregar Nuevo
                  </button>
                </div>
              </div>
            )}
            <hr></hr>
            {this.state.Nuevo && (
              <div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Nombre"
                    value={this.state.Nombre}
                    onChange={this.handleChange}
                    required
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Número:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Numero"
                    value={this.state.Numero}
                    onChange={this.handleChange}
                    required
                  />
                </div>
              </div>
            )}
            {this.state.Nuevo === false && (
              <div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Nombre:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Nombre"
                    value={this.state.Nombre}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-2 d-flex align-items-center">
                  <label>Número:</label>
                  <input
                    className="form-control ml-2 p-1"
                    type="text"
                    name="Numero"
                    value={this.state.Numero}
                    onChange={this.handleChange}
                    readOnly
                  />
                </div>
              </div>
            )}

            {this.state.Numero.length !== 0 && (
              <div className="row d-flex justify-content-around align-items-center ml-5 mt-3">
                <br></br>
                <div className="col vcenter">
                  <button
                    type="submit"
                    className="ml-2 p-1 btn btn-outline-primary"
                  >
                    Siguiente &gt;&gt;
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default AltaCliente;
