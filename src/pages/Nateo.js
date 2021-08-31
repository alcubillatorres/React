import React, { Component } from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

class Nateo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        TipoNat: "",
    };
  }

  handleOnChange = (e) =>{
    const {name, value } = e.target
    this.setState({
      [name]: value
    })
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
            <small>CONFIGURACIÓN DE NAT</small>
          </h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* SELECCION MENU WAN /LAN*/}
          <hr></hr>
          <label>Tipo de Nat</label>
          <select
            name="TipoNat"
            className="form-select form-select-lg mb-3 ml-2"
            value={this.state.TipoNat}
            onChange={this.handleOnChange}
          >
            <option value="">Selecciona</option>
            <option value="Estatico">Estático</option>
            <option value="Dinamico">Dinámico</option>
          </select>
          <br></br>
          <br></br>
        </form>
      </div>
    );
  }
}
export default Nateo;
