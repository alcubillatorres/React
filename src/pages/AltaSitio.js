import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

class AltaSitio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Marca: "Fortinet",
      Modelo: "",
      Llave: "",
      Sitio: "",
    };
  }
  componentDidMount() {}

  handleonClick = (e) => {
    this.setState({});
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    const data = {
      Marca: this.state.Marca.trim(),
      Model: this.state.Modelo.trim(),
    };
    const url = "http://localhost:4000/clientes";
    axios({
      method: "post",
      url: url,
      data,
    }).then(
      (response) => {
        this.setState({
          Marca: "",
          Modelo: "",
        });
      },
      (error) => {
        alert("Ha ocurrido un error");
        console.log(error);
      }
    );
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
              <Link to="/altaSitio" className="alert-link">
                <h4 className="d-inline">Alta Sitio&gt;</h4>
              </Link>
            </div>
            <hr></hr>
            <div className="mb-2 d-flex align-items-center">
              <label>Sitio:</label>
              <input
                className="form-control ml-2 p-1"
                type="text"
                name="Sitio"
                value={this.state.Sitio}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-2 d-flex align-items-center">
              <label>Llave de Servicio:</label>
              <input
                className="form-control ml-2 p-1"
                type="text"
                name="Llave"
                value={this.state.Llave}
                onChange={this.handleChange}
              />
            </div>
            <div className="mb-2 d-flex align-items-center">
              <label className="mr-2">Marca de CPE</label>
              <select
                name="Marca"
                value={this.state.Marca}
                onChange={this.handleChange}
              >
                <option value="Fortinet">Fortinet</option>
                <option value="Cisco">Cisco</option>
              </select>
            </div>
            <div className="mb-2 d-flex align-items-center">
              <label className="mr-2">Módelo de CPE</label>
              {this.state.Marca === "Fortinet" && (
                <select
                  name="Modelo"
                  value={this.state.Modelo}
                  onChange={this.handleChange}
                >
                  <option value=""></option>
                  <option value="Fortinet">100F</option>
                  <option value="Cisco">60F</option>
                </select>
              )}
            </div>

            <hr></hr>
          </div>
        </form>
      </div>
    );
  }
}

export default AltaSitio;
