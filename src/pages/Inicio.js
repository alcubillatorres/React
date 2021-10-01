import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

class Inicio extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="mt-auto p-2 alert alert-light">
          <Link to="/" className="alert-link">
            <h4>Inicio&gt;</h4>
          </Link>
        </div>
        <div className="alert alert-light justify-content-center d-flex">
          <Link to="/altaCliente" className="alert-link">
            <h2>Alta Cliente</h2>
          </Link>
        </div>

        <div className="alert alert-light  justify-content-center d-flex">
          <Link to="/busqueda" className="btn disabled">
            <h2>Busqueda </h2>
          </Link>
        </div>
      </div>
    );
  }
}

export default Inicio;
